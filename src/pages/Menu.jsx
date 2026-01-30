import { useEffect } from 'react'
import { useLanguage } from '../LanguageContext.jsx'
import './Menu.css'

const MENU_ITEMS = [
  { img: '/Pics/dublinsmenupics/DoublinBarAndGrill_BeyondBeefSixOunceVeggieBurger.jpg', name: 'Beyond Beef Veggie Burger', description: 'Six-ounce plant-based patty with lettuce, tomato, and house sauce.', price: '$14' },
  { img: '/Pics/dublinsmenupics/DoublinBarAndGrill_BreadedChickenSandwich.jpg', name: 'Breaded Chicken Sandwich', description: 'Crispy breaded chicken breast on a toasted bun with pickles and mayo.', price: '$13' },
  { img: '/Pics/dublinsmenupics/DoublinBarAndGrill_ChickenParmesanSandwich.jpg', name: 'Chicken Parmesan Sandwich', description: 'Breaded chicken with marinara and melted mozzarella on a hoagie.', price: '$15' },
  { img: '/Pics/dublinsmenupics/DoublinBarAndGrill_CornedBeefAndCabbage.jpg', name: 'Corned Beef & Cabbage', description: 'Slow-braised corned beef with cabbage, carrots, and potatoes. An Irish classic.', price: '$18' },
  { img: '/Pics/dublinsmenupics/DoublinBarAndGrill_CupOfChili.jpg', name: 'Cup of Chili', description: 'House-made beef chili with beans, cheese, and a side of crackers.', price: '$6' },
  { img: '/Pics/dublinsmenupics/DoublinBarAndGrill_DoublinsHotdogCR2.jpg', name: "Dublin's Hot Dog", description: 'All-beef hot dog with your choice of toppings. A pub favorite.', price: '$8' },
  { img: '/Pics/dublinsmenupics/DoublinBarAndGrill_DublinsCheeseburger.jpg', name: "Dublin's Cheeseburger", description: 'Angus beef patty with American cheese, lettuce, tomato, and house sauce.', price: '$15' },
  { img: '/Pics/dublinsmenupics/DoublinBarAndGrill_GrilledChickenSandwich.jpg', name: 'Grilled Chicken Sandwich', description: 'Grilled chicken breast with lettuce, tomato, and garlic aioli.', price: '$14' },
  { img: '/Pics/dublinsmenupics/DoublinBarAndGrill_GrilledHamAndCheeseSandwich.jpg', name: 'Grilled Ham & Cheese', description: 'Classic ham and melted Swiss on grilled sourdough.', price: '$12' },
  { img: '/Pics/dublinsmenupics/DoublinBarAndGrill_ItalianBeefSandwich.jpg', name: 'Italian Beef Sandwich', description: 'Thin-sliced beef in au jus with giardiniera. Chicago style.', price: '$14' },
  { img: '/Pics/dublinsmenupics/DoublinBarAndGrill_ItalianSausage.jpg', name: 'Italian Sausage', description: 'Grilled Italian sausage with peppers and onions on a hoagie.', price: '$13' },
  { img: '/Pics/dublinsmenupics/DoublinBarAndGrill_JalapenoPoppers.jpg', name: 'Jalapeño Poppers', description: 'Crispy jalapeños stuffed with cream cheese, served with ranch.', price: '$9' },
  { img: '/Pics/dublinsmenupics/DoublinBarAndGrill_OnionRings.jpg', name: 'Onion Rings', description: 'Beer-battered onion rings with house dipping sauce.', price: '$8' },
  { img: '/Pics/dublinsmenupics/DoublinBarAndGrill_PappardellePasta.jpg', name: 'Pappardelle Pasta', description: 'Wide ribbon pasta with your choice of sauce. Ask your server for options.', price: '$16' },
  { img: '/Pics/dublinsmenupics/DoublinBarAndGrill_PennePastaWithShrimp.jpg', name: 'Penne Pasta with Shrimp', description: 'Penne in garlic butter sauce with sautéed shrimp and herbs.', price: '$19' },
  { img: '/Pics/dublinsmenupics/DoublinBarAndGrill_PolishSausage.jpg', name: 'Polish Sausage', description: 'Grilled Polish sausage with mustard and grilled onions.', price: '$12' },
  { img: '/Pics/dublinsmenupics/DoublinBarAndGrill_ReubenSandwich.jpg', name: 'Reuben Sandwich', description: 'Corned beef, Swiss cheese, sauerkraut, and Thousand Island on rye.', price: '$16' },
  { img: '/Pics/dublinsmenupics/DoublinBarAndGrill_RibeyeSteakSandwich.jpg', name: 'Ribeye Steak Sandwich', description: 'Sliced ribeye with caramelized onions and horseradish cream.', price: '$18' },
  { img: '/Pics/dublinsmenupics/DoublinBarAndGrill_TurkeyBurger.jpg', name: 'Turkey Burger', description: 'Lean turkey patty with lettuce, tomato, and cranberry mayo.', price: '$14' },
  { img: '/Pics/dublinsmenupics/DoublinBarAndGrill_VeggieSandwich.jpg', name: 'Veggie Sandwich', description: 'Grilled vegetables with hummus, arugula, and balsamic on ciabatta.', price: '$13' },
]

export default function Menu() {
  const { t } = useLanguage()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="menu-page">
      <section className="menu-page-hero">
        <div className="container">
          <h1 className="menu-page-title">{t('menu')}</h1>
          <p className="menu-page-subtitle">{t('menuTitle')}</p>
        </div>
      </section>
      <section className="menu-page-content">
        <div className="container">
          <ul className="menu-page-list">
            {MENU_ITEMS.map((item, i) => (
              <li key={i} className="menu-page-item">
                <div className="menu-page-item-image-wrap">
                  <img src={item.img} alt={item.name} className="menu-page-item-image" />
                </div>
                <div className="menu-page-item-content">
                  <div className="menu-page-item-head">
                    <h2 className="menu-page-item-name">{item.name}</h2>
                    <span className="menu-page-item-price">{item.price}</span>
                  </div>
                  <p className="menu-page-item-desc">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
