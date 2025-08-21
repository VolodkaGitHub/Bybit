export async function patchData(payload: {
    id: number;
    bankName?: string;
    receiver?: string;
    cardNumber?: string;
  }) {
    const res = await fetch(`${process.env.API_URL}/api/data`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-api-token': process.env.API_SECRET!,
      },
      body: JSON.stringify(payload),
    });
  
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
}  