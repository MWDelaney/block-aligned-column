/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType, registerBlockStyle } from '@wordpress/blocks';
import { InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

registerBlockStyle('rebel/aligned-column', {
  name: 'align-start',
  label: 'Align Start',
  isDefault: true,
});

registerBlockStyle('rebel/aligned-column', {
  name: 'align-end',
  label: 'Align End',
});

registerBlockStyle('rebel/aligned-column', {
  name: 'align-center',
  label: 'Align Center',
});

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType('rebel/aligned-column', {
  /**
   * This is the display title for your block, which can be translated with `i18n` functions.
   * The block inserter will show this name.
   */
  title: __('Aligned Column', 'create-block'),

  /**
   * This is a short description for your block, can be translated with `i18n` functions.
   * It will be shown in the Block Tab in the Settings Sidebar.
   */
  description: __(
    '',
    'create-block'
  ),

  /**
   * Blocks are grouped into categories to help users browse and discover them.
   * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
   */
  category: 'layout',

  /**
   * An icon property should be specified to make it easier to identify a block.
   * These can be any of WordPress’ Dashicons, or a custom svg element.
   */
  icon: 'align-none',

  /**
   * Optional block extended support features.
   */
  supports: {
    // Removes support for an HTML mode.
    html: false,
  },
  attributes: {
    columnWidth: {
      type: 'integer',
      default: 50
    },
    columnWidthEdit: {
      type: 'string',
      default: '50%'
    },
  },

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
   *
   * @param {Object} [props] Properties passed from the editor.
   *
   * @return {WPElement} Element to render.
   */

  edit: (props) => {

    const { attributes, setAttributes } = props;
    const columnWidthEdit = attributes.columnWidth + "%";

    return (
      <div className={props.className}>
        <InspectorControls>
          <PanelBody
            title="Column Width"
            icon=""
            initialOpen={true}
          >
            <RangeControl
              label="Column Width"
              value={attributes.columnWidth}
              min={1}
              max={100}
              onChange={value => {
                setAttributes({ columnWidth: value })
                setAttributes({ columnWidthEdit: value + "%" });
              }}
            />
          </PanelBody>
        </InspectorControls>
        <div className="aligned-column-inner" style={{ flexBasis: columnWidthEdit }}>
          <InnerBlocks />
        </div>
      </div>
    );
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by the block editor into `post_content`.
   *
   * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
   *
   * @return {WPElement} Element to render.
   */
  save: (props) => {
    const columnWidth = props.attributes.columnWidthEdit;

    return (
      <div className={props.className}>
        <div className="aligned-column-inner" style={{ flexBasis: columnWidth }}>
          <InnerBlocks.Content />
        </div>
      </div>
    );
  },
});
