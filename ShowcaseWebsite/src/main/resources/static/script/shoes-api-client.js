class ShoesApiClient {
    constructor(baseUrl = null) {
        if (!baseUrl) {
            if (window.location.hostname === 'localhost') {
                this.baseUrl = 'http://localhost:8080';
            } else {
                this.baseUrl = `${window.location.protocol}//${window.location.host}`;
            }
        } else {
            this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        }
        
        this.apiUrl = `${this.baseUrl}/api`;
        this.imagesUrl = this.baseUrl;
    }

    async request(endpoint, options = {}) {
        const url = `${this.apiUrl}${endpoint}`;
        
        const defaultOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const finalOptions = { ...defaultOptions, ...options };

        try {
            const response = await fetch(url, finalOptions);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new ApiError(
                    response.status,
                    errorData.message || `HTTP ${response.status}: ${response.statusText}`,
                    errorData
                );
            }

            return await response.json();
            
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(0, `Errore di rete: ${error.message}`, { originalError: error });
        }
    }

    async getAllShoes() {
        return await this.request('/scarpe');
    }

    async getShoeById(id) {
        return await this.request(`/scarpe/${id}`);
    }

    async getShoesByCategory(category) {
        return await this.request(`/scarpe/categoria/${encodeURIComponent(category)}`);
    }

    async getShoesBySeason(season) {
        return await this.request(`/scarpe/stagione/${encodeURIComponent(season)}`);
    }

    async getFilteredShoes(filters = {}) {
        const params = new URLSearchParams();
        
        if (filters.categoria) params.append('categoria', filters.categoria);
        if (filters.stagione) params.append('stagione', filters.stagione);
        
        const queryString = params.toString();
        const endpoint = queryString ? `/scarpe/filtri?${queryString}` : '/scarpe/filtri';
        
        return await this.request(endpoint);
    }

    getImageUrl(imageUrl) {
        if (!imageUrl) return null;
        if (imageUrl.startsWith('http')) return imageUrl;
        return `${this.imagesUrl}${imageUrl}`;
    }

    getCategoryLabel(category) {
        const labels = {
            'bambini': 'Bambini',
            'primi-passi': 'Primi Passi'
        };
        return labels[category] || category || 'Categoria non specificata';
    }

    getSeasonLabel(season) {
        const labels = {
            'autunno-inverno': 'Autunno/Inverno',
            'primavera-estate': 'Primavera/Estate'
        };
        return labels[season] || season || 'Stagione non specificata';
    }
}

class ApiError extends Error {
    constructor(status, message, data = {}) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }

    isNetworkError() {
        return this.status === 0;
    }

    isNotFound() {
        return this.status === 404;
    }

    isBadRequest() {
        return this.status === 400;
    }

    isServerError() {
        return this.status >= 500;
    }
}

function createShoesApiClient(baseUrl = 'http://localhost:8080') {
    return new ShoesApiClient(baseUrl);
}