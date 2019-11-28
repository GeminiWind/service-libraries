import StorageClient from '../StorageClient';

const storageClient = new StorageClient();

const useStorage = (req, res, next) => {
    req.storageClient = storageClient;

    next();
}

export default useStorage;
