import { useEffect, useState } from 'react';
function HomePage() {
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/hello');
            const reader = response?.body?.getReader();
            if (reader) {
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    console.log('Received', value);
                }
            }

        }
        fetchData();
    }, []);
    return <div>Welcome to Next.js!</div>
}

export default HomePage