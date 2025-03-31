// Mock movie data
const movies = [
    {
        id: 1,
        title: "Stranger Things",
        image: "https://images.pexels.com/photos/3945317/pexels-photo-3945317.jpeg",
        year: 2016,
        rating: "TV-14",
        match: "97%",
        genres: ["Sci-Fi", "Horror", "Drama"],
        description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl."
    },
    {
        id: 2,
        title: "The Crown",
        image: "https://images.pexels.com/photos/3495001/pexels-photo-3495001.jpeg",
        year: 2016,
        rating: "TV-MA",
        match: "95%",
        genres: ["Drama", "History"],
        description: "This drama follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century."
    },
    // More movies would be added here
];

// DOM Elements
const movieGrid = document.querySelector('.grid');
const searchInput = document.getElementById('searchInput');
const searchResultsContainer = document.getElementById('searchResultsContainer');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Populate movie grid on home page
    if (movieGrid) {
        populateMovieGrid();
    }

    // Set up search functionality
    if (searchInput) {
        setupSearch();
    }
});

// Populate movie grid with mock data
function populateMovieGrid() {
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card relative group';
        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}" class="w-full h-full object-cover rounded">
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <button class="opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full transition-all duration-300">
                    <i class="fas fa-play"></i>
                </button>
            </div>
            <p class="mt-2 text-sm">${movie.title}</p>
        `;
        movieGrid.appendChild(movieCard);
    });
}

// Set up search functionality
function setupSearch() {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm.length > 0) {
            const results = movies.filter(movie => 
                movie.title.toLowerCase().includes(searchTerm) ||
                movie.genres.some(genre => genre.toLowerCase().includes(searchTerm))
            );
            
            displaySearchResults(results);
        } else {
            searchResultsContainer.innerHTML = '';
        }
    });
}

// Display search results
function displaySearchResults(results) {
    searchResultsContainer.innerHTML = '';
    
    if (results.length === 0) {
        searchResultsContainer.innerHTML = '<p class="text-gray-400">No results found</p>';
        return;
    }

    const resultsGrid = document.createElement('div');
    resultsGrid.className = 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4';
    
    results.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'relative group';
        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}" class="w-full h-full object-cover rounded">
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <button class="opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full transition-all duration-300">
                    <i class="fas fa-play"></i>
                </button>
            </div>
            <p class="mt-2 text-sm">${movie.title}</p>
        `;
        resultsGrid.appendChild(movieCard);
    });
    
    searchResultsContainer.appendChild(resultsGrid);
}

// Navigation functionality
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // In a real app, this would navigate to the appropriate page
        console.log(`Navigating to: ${link.textContent}`);
    });
});