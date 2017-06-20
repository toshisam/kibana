import truncateTemplate from './truncate.html';
import largeString from './large.html';

export function truncateEditor() {
  return {
    formatId: 'truncate',
    editor: {
      template: truncateTemplate,
      controllerAs: 'cntrl',
      controller: function () {
        this.sampleInputs = [ largeString ];
      }
    }
  };
}
