import { MongoClient, ObjectId } from 'mongodb';

type ToMongoDoc<T extends { id: string }> = Omit<T, 'id'> & { _id: ObjectId };
type FromMongoDoc<T extends { _id: ObjectId }> = Omit<T, '_id'> & {
  id: string;
};

const uri = process.env.MONGO_URI as string;
const options = {};

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

class Singleton {
  private static _instance: Singleton;
  private client: MongoClient;
  private clientPromise: Promise<MongoClient>;
  private constructor() {
    this.client = new MongoClient(uri, options);
    this.clientPromise = this.client.connect();
    if (process.env.NODE_ENV === 'development') {
      // In development mode, use a global variable so that the value
      // is preserved across module reloads caused by HMR (Hot Module Replacement).
      global._mongoClientPromise = this.clientPromise;
    }
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new Singleton();
    }
    return this._instance.clientPromise;
  }
}

const getDefaultDb = async () => {
  const client = await Singleton.instance;
  return client.db('flow-machine');
};

export const getDocCollection = async <T extends { id: string }>() => {
  const db = await getDefaultDb();
  return db.collection<ToMongoDoc<T>>('docs');
};
export const getProjectCollection = async <T extends { id: string }>() => {
  const db = await getDefaultDb();
  return db.collection<ToMongoDoc<T>>('projects');
};
export const getTaskCollection = async <T extends { id: string }>() => {
  const db = await getDefaultDb();
  return db.collection<ToMongoDoc<T>>('tasks');
};
export const getTicketCollection = async <T extends { id: string }>() => {
  const db = await getDefaultDb();
  return db.collection<ToMongoDoc<T>>('tickets');
};
export const getConnectionCollection = async <T extends { id: string }>() => {
  const db = await getDefaultDb();
  return db.collection<ToMongoDoc<T>>('connections');
};

export const toMongoDocId = (id: string) => ObjectId.createFromHexString(id);

export const toMongoDoc = <T extends { id: string }>({ id, ...rest }: T) =>
  ({ _id: toMongoDocId(id), ...rest }) as const satisfies ToMongoDoc<T>;

export const fromMongoDoc = <T extends { _id: ObjectId }>({
  _id,
  ...rest
}: T) =>
  ({ id: _id.toHexString(), ...rest }) as const satisfies FromMongoDoc<T>;
