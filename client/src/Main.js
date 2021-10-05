import MoviesContainer from "./MoviesContainer"
import Profile from "./Profile"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {useState, useEffect} from 'react'
import AddMovies from "./AddMovies";
import CustomStacks from "./CustomStacks";

function Main({apiKey}) {
    const [user, setUser] = useState([])
    const [cards, setCards] = useState([])
    const [cardstack, setCardstack] = useState(0)
    const [cardstackName, setCardstackName] = useState('')
    const [cardstackId, setCardstackId] = useState(0)
    const [rerenderDelete, setRerenderDelete] = useState(true)



    useEffect(() => {
        fetch('/me')
            .then(response => response.json())
            .then(data => {
                setUser(data)
                setCards(data.cardstacks)
            })
        }, [rerenderDelete])

    // useEffect(() => {
    //     console.log(id)
    // }, [id])



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
                    />
            </Route>

            <Route exact path="/addmovies">
                <AddMovies 
                    cardstackName={cardstackName} 
                    cardstackId={cardstackId}
                    setRerenderDelete={setRerenderDelete}
                    rerenderDelete={rerenderDelete}
                    apiKey={apiKey}/>
            </Route>

            <Route exact path="/custom">
                <CustomStacks/>
            </Route>
        </Switch>
        </>
    )
}

export default Main