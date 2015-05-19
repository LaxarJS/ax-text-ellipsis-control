# AxTextEllipsisControl

> An AngularJS directive wrapper for the trunk8 library, for use in LaxarJS widgets 

This control can be used to truncate text in a more configurable way than css alone can do.
It uses the jQuery [trunk8 plugin](https://github.com/rviscomi/trunk8). 
 

## Installation

To retrieve a copy of this control you can either clone it directly using git or alternatively install it via Bower.
For general information on installing, styling and optimizing controls, have a look at the [LaxarJS documentation](https://github.com/LaxarJS/laxar/blob/master/docs/manuals/installing_controls.md).

### Setup Using Bower

Install the control:

```sh
bower install laxarjs.ax-text-ellipsis-control
```

Reference the control from the `widget.json` of your widget:
 
```json
   "controls": [ "laxarjs.ax-text-ellipsis-control" ]
```


## Usage

There are three directives available: 
`axTextEllipsis` can only be used for static content already present at the DOM node the directive is set on.
Truncation options can be passed as an object (binding) to the directive attribute.

Both `axBindTruncated` and `axBindHtmlTruncated` can be used to dynamically bind a string to possibly be truncated.
The DOM node's content is ignored and only the bound value is rendered.
Whereas the first one can only bind simple text, the latter can also render HTML.
Both take their settings via the value of `axTruncationOptions` as an object (binding).
 
The following trunk8 settings are supported as truncation options.

- `fill` (Default: `'&hellip;'`) The string to insert in place of the omitted text.
  This value may include HTML.
- `lines` (Default: `1`) The number of lines of text-wrap to tolerate before truncating.
  This value must be an integer greater than or equal to 1.
- `side` (Default: `'right'`) The side of the text from which to truncate. Valid values include 'center',
  'left', and 'right'.
- `tooltip` (Default: `true`) When true, the title attribute of the targeted HTML element will be set to the original, untruncated string.
  Valid values include true and false.
- `width` (Default: `'auto'`) The width, in characters, of the desired text.
  When set to `'auto'`, trunk8 will maximize the amount of text without spilling over.
