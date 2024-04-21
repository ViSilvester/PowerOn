export class EzIO {
    static async loadImageFromUrl(url) {
        return new Promise((resolve, reject) => {
            var request = new XMLHttpRequest();
            request.responseType = "blob";
            request.open("GET", url, true);
            request.send();
            request.onload = async () => {
                let img;
                if (request.status == 200) {
                    img = await createImageBitmap(request.response);
                    resolve(img);
                }
                else {
                    reject();
                }
            };
        });
    }
    static async loadArrayBufferFromUrl(url) {
        return new Promise((resolve, reject) => {
            var request = new XMLHttpRequest();
            request.responseType = "arraybuffer";
            request.open("GET", url, true);
            request.send();
            request.onload = async () => {
                if (request.status == 200) {
                    resolve(request.response);
                }
                else {
                    reject();
                }
            };
        });
    }
    static async loadJsonFromUrl(url) {
        return new Promise((resolve, reject) => {
            var request = new XMLHttpRequest();
            request.responseType = "json";
            request.open("GET", url, true);
            request.send();
            request.onload = async () => {
                if (request.status == 200) {
                    resolve(request.response);
                }
                else {
                    reject();
                }
            };
        });
    }
}
