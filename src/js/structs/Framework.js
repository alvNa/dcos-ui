import {
  ROUTE_ACCESS_PREFIX,
  FRAMEWORK_ID_VALID_CHARACTERS
} from '../constants/FrameworkConstants';
import Config from '../config/Config';
import Service from './Service';
import FrameworkUtil from '../utils/FrameworkUtil';

module.exports = class Framework extends Service {
  getImages() {
    return FrameworkUtil.getServiceImages(this.getMetadata().images);
  }

  getMetadata() {
    return FrameworkUtil.getMetadataFromLabels(this.getLabels());
  }

  getNodeIDs() {
    return this.get('slave_ids');
  }

  getResourceID() {
    let regexp = new RegExp(`[^${FRAMEWORK_ID_VALID_CHARACTERS}]`, 'g');
    // Strip non-alphanumeric chars from name for safety
    return ROUTE_ACCESS_PREFIX + (this.get('name') || '').replace(regexp, '');
  }

  getUsageStats(resource) {
    let value = this.get('used_resources')[resource];

    return {value};
  }

  getName() {
    let labels = this.getLabels();
    if (labels && labels.DCOS_PACKAGE_FRAMEWORK_NAME) {
      return labels.DCOS_PACKAGE_FRAMEWORK_NAME;
    }
    return super.getName();
  }

  getWebURL() {
    let {
      DCOS_SERVICE_NAME,
      DCOS_SERVICE_PORT_INDEX,
      DCOS_SERVICE_SCHEME
    } = this.getLabels() || {};

    let name = encodeURIComponent(DCOS_SERVICE_NAME);

    if (!name || !DCOS_SERVICE_PORT_INDEX || !DCOS_SERVICE_SCHEME) {
      return null;
    }

    return `${Config.rootUrl}/service/${name}/`;

  }
};
