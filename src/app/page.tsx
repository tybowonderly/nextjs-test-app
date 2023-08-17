import { Suspense } from 'react';
import { setTimeout } from "timers/promises";

async function getData() {
    const res = await fetch('http://192.168.0.218:7878/api/v3/history?includeMovie=true', {
        headers: {
            'accept': 'application/json',
            'X-Api-Key': '6ecdc05c511e4d38bfc76d1a1f11c6ba'
        }
    });

    if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    //await setTimeout(5000);
    return res.json();
}

async function ShowData() {
    const data = await getData();
    return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export default async function Home() {

    return (
        <main>
            <h1>Home</h1>
            <Suspense fallback={<p>Loading</p>}>
                <ShowData />
            </Suspense>
        </main>
    )
}