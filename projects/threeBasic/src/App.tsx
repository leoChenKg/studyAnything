import santacruz from './santacruz.jpg'

export default function App() {
    console.log(santacruz)
    return <div>
        <img src={santacruz} alt="santacruz" />
    </div>
}