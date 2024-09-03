export async function getLocation(): Promise<{ latitude: number, longitude: number }> {
    if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by this browser.");
    }

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                reject(error);
            }
        );
    });
}

// Usage with async/await

