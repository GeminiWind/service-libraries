import StorageClient from './StorageClient';

const storageClient = new StorageClient();

(async () => {
    // console.log(await storageClient.create({
    //     "Id": "111121211111",
    //     "Path": "user/ha222xcvvadsa2idv@gmail.com",
    //     "Content": {
    //         "email": "haidv@gmail.com"
    //     },
    //     "Type": "user",
    //     "Attributes": {
    //         "CreatedAt": "2020-10-10",
    //         "UpdatedAt": "2020-10-10"
    //     }
    // }))
    // console.log(await storageClient.get('111121211111'));
    // const res = await storageClient.list();
    console.log(await storageClient.update(111121211111, {
        "Path": "user/ha222xcvvadsa2idv@gmail.com",
        "Content": {
            "email": "haidv7777777@gmail.com"
        },
        "Type": "user",
        "Attributes": {
            "CreatedAt": "2020-10-10",
            "UpdatedAt": "2020-10-10"
        }
    }))
    // console.log(res);
    // console.log(await storageClient.delete('111121211111'));
    
})()
