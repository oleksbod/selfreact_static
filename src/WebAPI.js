import axios from "axios";

function getUri()
{
    let debug = false;

    if(debug)
    {
        return "https://selfservetest-api.azurewebsites.net/";
    }
    else
        return "https://selfservetest-api.azurewebsites.net/";
}

export function GetUserByShop(shopname,onComplete,onError )
{
    const options = {
        method: 'GET',
        url:  getUri() + 'user/' + shopname,
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        return onComplete(response.data);
    }).catch(function (error) {
        console.error(error);
        return onError(error)
    });

    /*
    fetch( '/user/' + shopname, {

        method: 'GET', // or 'PUT'
        headers: {
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Data:', data);
            return onComplete(data);
        })
        .catch((error) => {daca nu ai
            console.error('Error:', error);
            return onError(error)
        });*/
}

export function LoginUser(username,password,onComplete,onError)
{
    const options = {
        method: 'POST',
        url:  getUri() +'user',
        data: {loginUser: 'user', loginPass: 'pass'},

    };

    axios.request(options).then(function (response)
    {
        console.log(response.data);
        return onComplete(response.data);
    }).catch(function (error)
    {
        console.error(error);
        return onError(error);
    });

    /*  fetch( '/user', {

          method: 'POST', // or 'PUT'
          headers: {
          },body: "{\n" +
              "  \"loginUser\":\""+username+"\",\n" +
              "  \"loginPass\":\""+password+"\"\n" +
              "}"
      }).then(response => response.json())
          .then(data => {
              console.log('Data:', data);

              return onComplete(data);
          })
          .catch((error) => {
              console.error('Error:', error);
              return onError(error)
          });*/

}

export function GetUser(onComplete,onError)
{

    let sesid ="";

    if( window.isMinimal)
        sesid = localStorage.getItem("sesid1");
    else
        sesid = localStorage.getItem("sesid");


    const options = {
        method: 'GET',
        url:  getUri() +'user/' + sesid,

    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        return onComplete(response.data);
    }).catch(function (error) {
        console.error(error);
        return onError(error)
    });

    /*
    fetch( '/user/' + sesid, {
        method: 'GET', // or 'PUT'
        headers: {
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Data:', data);
            return onComplete(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            return onError(error)
        });*/
}

export function CompleteRegistration(firstname,lastname,email,country,company,jobtitle,onComplete,onError)
{
    let body = {
        "action":"register",
        "firstname":firstname,
        "lastname":lastname,
        "email":email,
        "country":country,
        "company":company,
        "jobtitle":jobtitle,
    }

    UpdateUser(body,onComplete,onError);
}

export function UpdateUser(data,onComplete,onError)
{
    const options = {
        method: 'POST',
        url:  getUri() +'user',
        data: JSON.stringify(data)
    };

    axios.request(options).then(function (response)
    {
        console.log(response.data);
        return onComplete(response.data);
    }).catch(function (error) {
        console.error(error);
        return onError(error);
    });

    /*   fetch( '/user', {

           method: 'POST', // or 'PUT'
           headers: {
           },body: JSON.stringify(data)
       })
           .then(res => {
               let  responset  = res.json();
               return onComplete(responset);
           })
           .catch((error) => {
               console.error('Error:', error);
               return onError(error);
           });*/
}

export function UploadProducts(files,brandid, onSuccess, onFail)
{
    let form = new FormData();

    for(let t=0; t < files.length; t++)
    {
        form.append("photo"+t, files[t]);
    }

    const options = {
        method: 'PUT',
        url:  getUri() + 'product/' + brandid,
        data: form,
        headers: { "Content-Type": "multipart/form-data" }
    };

    axios.request(options).then(function (response) {
        onSuccess();
        console.log(response.data);
    }).catch(function (error) {
        onFail();
        console.error(error);
    });

    /*
    fetch('/product/'+ brandid, {method: "PUT", body: formData}).then((response) => {
        if (response.ok)
        {
            onSuccess();
        }
        else {
            onFail();
        }
    }).catch((error) => {
        onFail();
    });*/
}

export function DeleteProduct(productid,onComplete,onError)
{
    const options = {
        method: 'DELETE',
        url:  getUri() +'product/' + productid,
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        return onComplete(response.data);
    }).catch(function (error) {
        console.error(error);
        return onError(error)
    });
    /*   fetch( '/product/'+productid, {

           method: 'DELETE', // or 'PUT'
           headers: {
           }
       })
           .then(response => response.json())
           .then(data => {
               return onComplete(data);
           })
           .catch((error) => {
               return onError(error)
               console.error('Error:', error);
           });*/
}

export function GetProduct(productid,onComplete,onError)
{
    const options = {
        method: 'GET',
        url:  getUri() + 'product/' + productid,
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        return onComplete(response.data);
    }).catch(function (error) {
        console.error(error);
        return onError(error)
    });

    /*
    fetch(  '/product/'+productid, {

        method: 'GET', // or 'PUT'
        headers: {
        }
    })
        .then(response => response.json())

        .then(data => {
            return onComplete(data);
        })
        .catch((error) => {
            return onError(error)
            console.error('Error:', error);
        });*/
}

export function UpdateProduct(productId,productInfo,webpageUrl, onSuccess, onFail)
{
    let form = new FormData();
    form.append("productInfo",productInfo);
    form.append("webpageUrl",webpageUrl);

    const options = {
        method: 'POST',
        url:  getUri() + 'product/' + productId ,
        data: form,
        headers: { "Content-Type": "multipart/form-data" }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        onSuccess();
    }).catch(function (error) {
        console.error(error);
        onFail();
    });
    /*
    fetch( '/product/'+ productId, {method: "POST", body: formData}).then((response) => {
        if (response.ok)
        {
            onSuccess();
        }
        else {
            onFail();
        }
    }).catch((error) => {
        onFail();
    });*/
}


export function UploadInfotags(files,productid,brandid, onSuccess, onFail)
{
    let form = new FormData();

    for(let t=0; t < files.length; t++)
    {
        form.append("photo"+t, files[t]);
    }

    const options = {
        method: 'PUT',
        url:  getUri() + 'product/'+ brandid +'/' +productid,
        data: form,
        headers: { "Content-Type": "multipart/form-data" }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        onSuccess();
    }).catch(function (error) {
        console.error(error);
        onFail();
    });

    /*  fetch(  '/product/'+ brandid +"/" + productid, {method: "PUT", body: formData}).then((response) => {
          if (response.ok)
          {
              onSuccess();
          }
          else {
              onFail();
          }
      }).catch((error) => {
          onFail();
      });*/
}


export function CdnFetchImg(cdnId,onComplete,onFail)
{
    try {
        fetch( '/cdn/serve/'+cdnId).catch(err =>{

            return onFail();
        })

            .then(response => response.blob())
            .then(imageBlob => {
                // Then create a local URL for that image and print it
                const imageObjectURL = URL.createObjectURL(imageBlob);
                console.log(imageObjectURL);
                return onComplete(imageObjectURL);
            });
    }
    catch (e)
    {
        console.log("FailedFetchCdn");
        onFail();
    }

}

export function UploadCdnBatch(files,onSuccess,onFail)
{
    let form = new FormData();

    for(let i = 0; i < files.length; i++)
    {
        form.append("photo" + i, files[i]);
    }

    const options = {
        method: 'POST',
        url:  getUri() + 'cdn/upload/brandwalls',
        data: form,
        headers: { "Content-Type": "multipart/form-data" }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        onSuccess(response.data);
    }).catch(function (error) {
        console.error(error);
        onFail("null");
    });

    /* fetch( '/cdn/upload/brandwalls', {method: "POST", body: formData}).then((response => response.json())).then(response => {

             onSuccess(
                 response);

     }).catch((error) => {
         onFail("null");
     });*/
}

export function UploadCdn  (file,fileIdx, onSuccess, onFail)
{
    const form = new FormData();
    form.append("photo", file);

    const options = {
        method: 'POST',
        url:  getUri() + 'cdn/update/' + fileIdx,
        data: form,
        headers: { "Content-Type": "multipart/form-data" }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        onSuccess();
    }).catch(function (error) {
        console.error(error);
        onFail();
    });

    /*
    /
    let photo = file
    let formData = new FormData();
    console.log(fileIdx);
    formData.append("photo", photo);
    fetch( '/cdn/update/'+ fileIdx, {method: "POST", body: formData}).then((response) => {
        if (response.ok)
        {
            onSuccess();
        }
        else {
            onFail();
        }
    }).catch((error) => {
        onFail();
    });*/
}


export function getBrand(brandId,onComplete,onError)
{

    const options = {
        method: 'GET',
        url:  getUri() + 'data/brands/' + brandId,
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        return onComplete(response.data);
    }).catch(function (error) {
        console.error(error);
        return onError(error);
    });
    /*fetch( '/data/brands/'+brandId, {

        method: 'GET', // or 'PUT'
        headers: {
        }
    })
        .then(res => res.json().then(data=> {
            let  responset  = data;
            return onComplete(responset);
        })
        .catch((error) => {
            console.error('Error:', error);
            return onError(error);
        }));*/
}

