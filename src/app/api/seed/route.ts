import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Data" (
        id SERIAL PRIMARY KEY,
        data JSONB NOT NULL
      );
    `);

    await client.query('TRUNCATE TABLE "Data" RESTART IDENTITY');

    const defaultEntry = {
      bankName: 'Admin',
      receiver: 'Admin',
      cardNumber: '1234 5678 9012 3456',
    };

    await client.query(
      'INSERT INTO "Data" ("data") VALUES ($1)',
      [JSON.stringify(defaultEntry)]
    );

    return NextResponse.json({ success: true, count: 1, bankName: defaultEntry.bankName, receiver: defaultEntry.receiver, cardNumber: defaultEntry.cardNumber });
  } catch (err: any) {
    console.error('Seeding error:', err.message, err.stack);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  } finally {
    client.release();
  }
}