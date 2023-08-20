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
        throw new Error('Failed to fetch data');
    }
    //await setTimeout(5000);
    return res.json();
}

async function ShowData() {
    const { records: data } = await getData();
    const images = [];
    for(const movie in data) {
        images.push(
                <div style={{backgroundImage: `url(${data[movie].movie.images[0].url})`}} className=' group/hover flex-none w-[200px] h-[300px] hover:blur-sm bg-contain bg-center bg-no-repeat rounded-lg'>
                </div>
        )
    }

    return (
        <div className='bg-gradient-to-r from-cyan-500 to-blue-500 flex flew-row flew-nowrap m-5 overflow-hidden hover:overflow-x-auto rounded-lg gap-4 p-4 shadow-2xl' >
            {images}
        </div>
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