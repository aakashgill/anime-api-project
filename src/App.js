import React from 'react';
import './App.css';
import CardContainer from './components/CardContainer';
import Card from './components/Card';

const API_URL = "https://api.jikan.moe/v3/search/anime?q=";
class App extends React.Component {
  state = {
    userInput: '',
    animeCharacters: [],
    loadingMessage: '',
    pageCounter: 1
  }

  handleUserInput = (target) => {
    this.setState({userInput: target.currentTarget.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      animeCharacters: [],
      loadingMessage: 'fetching...'
    });
    this.fetchData();
  }

  handleLoadMore = async () => {
    let userInput = this.state.userInput;
    this.setState({
      pageCounter: this.state.pageCounter + 1,
      loadingMessage: 'fetching...'
    })
    try {
      const response = await fetch(`${API_URL}${userInput}&limit=16&page=${this.state.pageCounter}`);
      const json = await response.json();

      this.setState({
        // append array in existing array.
        animeCharacters: [...this.state.animeCharacters, ...json.results], 
        loadingMessage: `${API_URL}${userInput}`,
      });

    } catch(err) {
      this.setState({
        loadingMessage: 'Fetching Failed. Please retry'
      });
    }
  }

  fetchData = async () => {
    let userInput = this.state.userInput;
    try {
      const response = await fetch(`${API_URL}${userInput}&limit=16&page=1`);
      const json = await response.json();

      this.setState({
        // append array in existing array.
        animeCharacters: [...this.state.animeCharacters, ...json.results], 
        loadingMessage: `${API_URL}${userInput}`,
      });

    } catch(err) {
      this.setState({ loadingMessage: 'Fetching Failed. Please retry'});
    }
  }

  usingMouse = () => {
    document.body.addEventListener('mousedown', function() {
        document.body.classList.add('using-mouse');
    });
    document.body.addEventListener('keydown', function() {
        document.body.classList.remove('using-mouse');
    });
  }

  componentDidMount = () => {
    // This will hide focus ring when click using mouse, but not when navigating through Keyboard. For Accessibility purposes.
    this.usingMouse();
  }

  render() {
    return (
      <div className="app">
        <header className="app__header">
          <form className="search-form" onSubmit={this.handleSubmit}>
            <label className="search-form__label" htmlFor="anime-character">Type below to search for Anime</label>
            <div className="search-form__group">
              <input required id="anime-character" className="search-form__input" value={this.state.userInput} onChange={this.handleUserInput} type="text"/>
              <button className="search-form__button">Go</button>
            </div>
          </form>
          <p>
            <span className="fetch-message">Requesting:</span>
            {this.state.loadingMessage}
          </p>
        </header>
        <main>
          {
            this.state.animeCharacters &&
              <CardContainer>
                {
                  this.state.animeCharacters.map((anime) => (  
                      <Card key={anime.mal_id} image={anime.image_url} title={anime.title}/>
                  ))
                }
              </CardContainer>
          }
          {
            this.state.animeCharacters.length ?
              <button className="btn-load" onClick={this.handleLoadMore}>Load more</button>
            : null
          }
        </main>
      </div>
    )
  }
}

export default App;
