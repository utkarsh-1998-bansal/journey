// API Communication

export const API = {
    async getContent() {
        const res = await fetch('/api/content');
        return await res.json();
    }
};
