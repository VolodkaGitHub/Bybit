import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(req: NextRequest) {
    const client = await pool.connect();
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
  
      if (id) {
        const res = await client.query('SELECT * FROM "Data" WHERE id = $1', [id]);
        if (res.rows.length === 0) {
          return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }
        return NextResponse.json(res.rows[0]);
    }
  
      const res = await client.query('SELECT * FROM "Data"');
      return NextResponse.json(res.rows);
    } finally {
      client.release();
    }
}  

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { bankName, receiver, cardNumber } = body;

  const client = await pool.connect();
  try {
    await client.query(
      'INSERT INTO "Data" ("data") VALUES ($1)',
      [JSON.stringify({ bankName, receiver, cardNumber })]
    );
    return NextResponse.json({ success: true });
  } finally {
    client.release();
  }
}

export async function PUT(req: NextRequest) {
    const body = await req.json();
    const { id = 1, bankName, receiver, cardNumber } = body;
  
    const client = await pool.connect();
    try {
      await client.query(
        'UPDATE "Data" SET "data" = $1 WHERE id = $2',
        [JSON.stringify({ bankName, receiver, cardNumber }), id]
      );
      return NextResponse.json({ success: true });
    } finally {
      client.release();
    }
}

export async function PATCH(req: NextRequest) {
    const body = await req.json();
    const { id = 1, bankName, receiver, cardNumber } = body;
  
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT "data" FROM "Data" WHERE id = $1',
        [id]
      );
  
      if (result.rowCount === 0) {
        return NextResponse.json({ error: 'Record not found' }, { status: 404 });
      }
  
      const existingData = result.rows[0].data;
  
      const updatedData = {
        ...existingData,
        ...(bankName !== undefined && { bankName }),
        ...(receiver !== undefined && { receiver }),
        ...(cardNumber !== undefined && { cardNumber }),
      };
  
      await client.query(
        'UPDATE "Data" SET "data" = $1 WHERE id = $2',
        [JSON.stringify(updatedData), id]
      );
  
      return NextResponse.json({ success: true, updated: updatedData });
    } finally {
      client.release();
    }
}
  
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  const client = await pool.connect();
  try {
    await client.query('DELETE FROM "Data" WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } finally {
    client.release();
  }
}
