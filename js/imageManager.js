import awsConfigData from "./awsConfig.js";

export default class imageManager {

    upload(bucketName, uploadFiles, targetDirElm) {
        const uploadFile     = uploadFiles.files[0];
        const uploadFileName = uploadFile.name;
        const targetDir      = targetDirElm.value;
        const uploadFileKey  = targetDir + '/' + uploadFileName;

        const upload = new AWS.S3.ManagedUpload({
            params: {
                Bucket: bucketName,
                Key: uploadFileKey,
                Body: uploadFile,
            }
        });

        const promise = upload.promise();
        promise.then(
            function(data) {
            alert("画像をアップロードしました。");
            window.location.reload();
            },
            function(err) {
            alert("画像のアップロードに失敗しました。: ", err);
            window.location.reload();
            }
        );

    }

    createDirectoryHeading(s3, bucketParams) {
        const params = {
            ...bucketParams,
            Delimiter: '/'
        }

        s3.listObjects(params, function(err, data) {
            if (err) {
                return alert("Error: " + err.message);
            } else {
                const directoryList = data.CommonPrefixes.map(directory => directory.Prefix);
                // ディレクトリ名表示DOM取得
                const dirListSelectBox = document.getElementById('upload-dir');
                const dirListElement   = document.getElementById('dir-list');


                directoryList.forEach(directory => {
                    const dirName = directory.replace(/\//, "");
                    // サムネイル欄の見出し生成
                    const h2Elm       = document.createElement('h2');
                    h2Elm.className   = "dir-name";
                    h2Elm.textContent = dirName;

                    const optionElm = document.createElement('option');
                    optionElm.textContent = dirName;
                    optionElm.setAttribute('value', dirName);

                    dirListSelectBox.appendChild(optionElm);
                    dirListElement.appendChild(h2Elm);
                });
            }
        });
    }

    createImageThumbnales(s3, bucketParams) {
        const params = {
            ...bucketParams,
        }
        const awsConfig = new awsConfigData();

        s3.listObjects(params, function(err, data) {
            if (err) {
                return alert("Error: " + err.message);
            } else {
                const href      = this.request.httpRequest.endpoint.href;
                const bucketUrl = awsConfig.getImageBucketEndpoint() + '/';

                // 画像要素格納用配列
                const imageElements = [];
                data.Contents.forEach(imageObj => {
                    if (imageObj.Key.match(/.*jpg$|.*png$|.*gif$/i)) {
                        const imgUrl = bucketUrl + imageObj.Key;

                        // ダウンロードリンク生成
                        const paramsJson  = {Bucket: params.Bucket, Key: imageObj.Key};
                        const downloadUrl = s3.getSignedUrl('getObject', paramsJson);

                        const insertElement = `
                            <div class="thumbnail-img-container" style="display: inline-block">
                                <img src="${ imgUrl }" class="thumbnail-img">
                                <a href="${downloadUrl}" style="display:block;">ダウンロード</a>
                            </div>
                        `
                        return imageElements.push(insertElement);
                    }
                });

                const targetElements = document.getElementsByClassName("dir-name");

                if (targetElements.length) {
                    Object.keys(targetElements).forEach((key)=> {
                        let counter = 0;

                        // 画像配置ディレクトリの取得
                        const imageKey = targetElements[key].innerHTML;

                        const ptn = new RegExp(`${imageKey}/`);
                        imageElements.forEach(element => {
                            if(element.match(ptn)) {
                                targetElements[key].insertAdjacentHTML('afterend', element);
                                counter++;
                            }
                        });

                        if(counter === 0) {
                            targetElements[key].insertAdjacentHTML('afterend', '<p class="placeholder-text">画像はありません</p>');
                        }
                    });

                    document.getElementById("dir-list").style.display = "block";
                } else {
                    window.location.reload();
                }
            }
        });
    }

}