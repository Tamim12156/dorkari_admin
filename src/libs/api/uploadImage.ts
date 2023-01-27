import { BaseAPI } from './baseAPI';
import { BR } from './interfaces';

class ImageAPI extends BaseAPI {
    constructor(baseURL) {
        super(baseURL);
    }

    uploadImageToBB = (imageData: FormData) => this.image<BR<any>>('upload',imageData );
}

export const imageApi = new ImageAPI(process.env.imageApi);