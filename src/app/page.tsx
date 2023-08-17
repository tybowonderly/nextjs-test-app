import { Suspense } from 'react';

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
    const { records: data } = await getData();
    const images = []
    for(const movie in data) {
        images.push(<img src={data[movie].movie.images[0].url} alt='Image' width={300} height={450} />)
    }

    return (
        <>
            {images}
        </>
    )
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