import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb'; 


export async function GET() {
    const records = await getCollection('records');
    const all = await records.find({}).toArray();
    return NextResponse.json(all);
}


export async function POST(request) {
    const body = await request.json();
    const records = await getCollection('records');
    const { insertedId } = await records.insertOne(body);
    return NextResponse.json({ _id: insertedId, ...body }, { status: 201 });
}


export async function PUT(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id'); 
    const body = await request.json();
    
    const records = await getCollection('records');
    
   
    await records.updateOne(
        { _id: new ObjectId(id) },
        { $set: body }
    );
    
    return NextResponse.json({ success: true });
}


export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    const records = await getCollection('records');
    
    // Ștergem înregistrarea cu ID-ul respectiv
    await records.deleteOne({ _id: new ObjectId(id) });
    
    return NextResponse.json({ success: true });
}