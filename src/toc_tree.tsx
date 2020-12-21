// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import * as React from 'react';
import { Widget } from '@lumino/widgets';
import { IHeading } from './utils/headings';
import { TableOfContentsRegistry as Registry } from './registry';
import { TOCItem } from './toc_item';
import { TOCSidetabsToolbar } from './toc_sidetabs_toolbar';

/**
 * Interface describing component properties.
 *
 * @private
 */
interface IProperties extends React.Props<TOCTree> {
  /**
   * Display title.
   */
  title: string;

  /**
   * List of headings to render.
   */
  toc: IHeading[];

  /**
   * Toolbar.
   */
  toolbar: any;

  /**
   * Table of contents generator.
   */
  generator: Registry.IGenerator<Widget> | null;

  /**
   * Renders a heading item.
   *
   * @param item - heading
   * @returns rendered heading
   */
  itemRenderer: (item: IHeading) => JSX.Element | null;
}

/**
 * Interface describing component state.
 *
 * @private
 */
interface IState {
  /**
   * Boolean indicating whether to show the table of contents.
   */
  showToc: boolean;

  /**
   * Integer indicating which tab to display.
   */
  showSidetab: number;
}

/**
 * React component for a table of contents tree.
 *
 * @private
 */
class TOCTree extends React.Component<IProperties, IState> {
  constructor(props: IProperties) {
    super(props);
    this.state = {
      showToc: true,
      showSidetab: 0
    };
  }

  /**
   * Toggle whether to show the table of contents.
   */
  toggleToc = () => {
    this.setState({ showToc: !this.state.showToc });
  };

  /**
   * Toggle whether to show the table of contents.
   */
  toggleTab = () => (index: number) => {
    this.setState({ showToc: false, showSidetab: index });
  };

  /**
   * Renders a table of contents tree.
   */
  render() {
    const Toolbar = this.props.toolbar;

    // Map the heading objects onto a list of JSX elements...
    let i = 0;
    let list: JSX.Element[] = this.props.toc.map(el => {
      return (
        <TOCItem
          heading={el}
          itemRenderer={this.props.itemRenderer}
          key={`${el.text}-${el.level}-${i++}`}
        />
      );
    });
    return (
      <div className="jp-TableOfContents">
        <header>{this.props.title}</header>
        <TOCSidetabsToolbar
          showToc={this.state.showToc}
          toggleToc={this.toggleToc}
          showSidetab={this.state.showSidetab}
          toggleTab={this.toggleTab}
        />
        {this.state.showToc && Toolbar && <Toolbar />}
        {this.state.showToc && (
          <ul className="jp-TableOfContents-content">{list}</ul>
        )}
      </div>
    );
  }
}

/**
 * Exports.
 */
export { TOCTree };
