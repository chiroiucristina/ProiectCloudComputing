import { MongoClient } from 'mongodb';

const uri = process.env.NEXT_ATLAS_URI;

let mongoClient = null;
let database = null;

if (!uri) {
    throw new Error('Te rugăm să adaugi NEXT_ATLAS_URI în fișierul .env');
}

export async function connectToDatabase() {
    try {
        if (mongoClient && database) {
            return { mongoClient, database };
        }

        if (process.env.NODE_ENV === 'development') {
            if (!global._mongoClient) {
                mongoClient = await new MongoClient(uri).connect();
                global._mongoClient = mongoClient;
            } else {
                mongoClient = global._mongoClient;
            }
        } else {
            mongoClient = await new MongoClient(uri).connect();
        }

        database = await mongoClient.db(process.env.NEXT_ATLAS_DATABASE);
        
        // Verificăm dacă am reușit să obținem baza de date
        if (!database) {
            throw new Error("Nu s-a putut accesa baza de date.");
        }

        return { mongoClient, database };
    } catch (e) {
        console.error("EROARE LA CONECTARE:", e.message);
        // Returnăm un obiect gol sau aruncăm eroarea mai departe ca să nu blocheze destucturarea
        throw e;
    }
}

export async function getCollection(name) {
    const result = await connectToDatabase();
    if (!result || !result.database) {
        throw new Error("Conexiunea la baza de date a eșuat.");
    }
    return result.database.collection(name);
}