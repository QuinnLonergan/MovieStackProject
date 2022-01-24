import MoviesContainer from "./MoviesContainer"
import Profile from "./Profile"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {useState, useEffect} from 'react'
import AddMovies from "./AddMovies";
import CustomStacks from "./CustomStacks";
import GenreStacks from "./GenreStacks";

function Main({apiKey}) {
    const [user, setUser] = useState([])
    const [cards, setCards] = useState([])
    const [cardstack, setCardstack] = useState(0)
    const [cardstackName, setCardstackName] = useState('')
    const [cardstackId, setCardstackId] = useState(0)
    const [rerenderDelete, setRerenderDelete] = useState(true)
    const [renderName, setRenderName] = useState('')




    useEffect(() => {
        fetch('/me')
            .then(response => response.json())
            .then(data => {
                setUser(data)
                setCards(data.cardstacks)
            })
        }, [rerenderDelete])
    

    function handleDelete(id){
        fetch(`/cardstacks/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            }
        })
        setRerenderDelete(!rerenderDelete)
        console.log(rerenderDelete)
    }



    return(
        <>
        <Switch>
            <Route exact path="/stacks/:id">
                <MoviesContainer apiKey={apiKey} key={user.id} user={user} cardstack={cardstack} setCardstack={setCardstack}/>
            </Route>

            <Route exact path="/">
                <Profile 
                    user={user} 
                    cards={cards} 
                    setCardstackId={setCardstackId} 
                    setCardstackName={setCardstackName}  
                    cardstackName={cardstackName}
                    setRerenderDelete={setRerenderDelete}
                    rerenderDelete={rerenderDelete}
                    setRenderName={setRenderName}
                    handleDelete={handleDelete}
                    />
            </Route>

            <Route exact path="/addmovies">
                <AddMovies 
                    cardstackName={cardstackName} 
                    cardstackId={cardstackId}
                    setRerenderDelete={setRerenderDelete}
                    rerenderDelete={rerenderDelete}
                    apiKey={apiKey}
                    renderName={renderName}/>
            </Route>

            <Route exact path="/custom">
                <CustomStacks/>
            </Route>

            <Route exact path="/genre">
                <GenreStacks/>
            </Route>
        </Switch>
        </>
    )
}

export default Main