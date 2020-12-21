// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import * as React from 'react';

/**
 * Interface describing component properties.
 *
 * @private
 */
interface IProperties {
  /**
   * Boolean indicating whether to show the table of contents.
   */
  showToc: boolean;

  /**
   * Function to change state of showToc
   */
  toggleToc: () => void;

  /**
   * Integer indicating which tab to display.
   */
  showSidetab: number;

  /**
   * Function to change state of showSideTab
   */
  toggleTab: () => void;
}

/**
 * Interface describing component state.
 *
 * @private
 */
interface IState {}

/**
 * React component for a table of contents tree.
 *
 * @private
 */
class TOCSidetabsToolbar extends React.Component<IProperties, IState> {
  /**
   * Returns a component for rendering a table of contents + sidetabs toolbar.
   *
   * @param props - toolbar properties
   * @returns toolbar component
   */

  /**
   * Renders a toc and sidetabs toolbar.
   *
   * @returns rendered toolbar
   */
  render() {
    const tocClasses = this.props.showToc
      ? ['jp-TableOfContents-icon', 'toc-toolbar-icon-selected']
      : ['jp-TableOfContents-icon', 'toc-toolbar-icon'];
    const tocIcon = (
      <div
        className="toc-toolbar-button"
        onClick={event => this.props.toggleToc()}
      >
        <div
          role="text"
          aria-label="Toggle ToC View"
          title="Toggle ToC View"
          className={tocClasses.join(' ')}
        />
      </div>
    );

    return (
      <div>
        <div className={'toc-toolbar'}>
          {tocIcon}
          <div className="vertical-divider" />
          <span>No tabs to display</span>
        </div>
      </div>
    );
  }
}

/**
 * Exports.
 */
export { TOCSidetabsToolbar };
