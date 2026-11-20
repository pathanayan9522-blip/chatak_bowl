import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import logo from '../logo.png';
import {
  ArrowLeft, BadgePercent, ChevronRight, Clock3, Copy, Heart, HelpCircle,
  Home, Info, Minus, Plus, Search, ShoppingBag, Star, Table2, Trophy,
  UserRound, UtensilsCrossed, Wifi, X, Check, Zap, Gamepad2, Gift,
  CreditCard, MapPin, Bell, Send
} from 'lucide-react';
import './styles.css';

const foodImages = {
  fries: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=85',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=85',
  sandwich: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=85',
  momo: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=700&q=85',
  pasta: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=85',
  coffee: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=85',
  shake: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=700&q=85',
  dessert: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=85',
};

const categories = ['All', 'Quick Bites', 'Fries', 'Sandwich', 'Burgers', 'Bowls', 'Dessert', 'Pasta', 'Momos', 'Drinks'];

const menuItems = [
  { id: 1, name: 'Peri Peri Loaded Fries', category: 'Fries', price: 249, oldPrice: 289, rating: 4.8, time: '12 min', image: foodImages.fries, veg: true, bestseller: true, desc: 'Crispy fries, peri-peri spice, cheese sauce and herbs.' },
  { id: 2, name: 'Chatak Cheese Burger', category: 'Burgers', price: 189, oldPrice: 220, rating: 4.7, time: '15 min', image: foodImages.burger, veg: true, bestseller: true, desc: 'Signature patty, cheese, fresh vegetables and chatak sauce.' },
  { id: 3, name: 'Jumbo Grilled Sandwich', category: 'Sandwich', price: 179, rating: 4.6, time: '14 min', image: foodImages.sandwich, veg: true, desc: 'Loaded grilled sandwich with vegetables and melting cheese.' },
  { id: 4, name: 'Steamed Momos', category: 'Momos', price: 149, oldPrice: 169, rating: 4.5, time: '10 min', image: foodImages.momo, veg: true, desc: 'Soft momos served with spicy house dip.' },
  { id: 5, name: 'Creamy Arrabbiata Pasta', category: 'Pasta', price: 229, rating: 4.8, time: '18 min', image: foodImages.pasta, veg: true, bestseller: true, desc: 'Pasta tossed in creamy tomato sauce with herbs.' },
  { id: 6, name: 'Cold Coffee', category: 'Drinks', price: 159, rating: 4.6, time: '5 min', image: foodImages.coffee, veg: true, desc: 'Chilled, frothy and freshly blended cold coffee.' },
  { id: 7, name: 'Chocolate Chip Shake', category: 'Drinks', price: 199, oldPrice: 229, rating: 4.7, time: '6 min', image: foodImages.shake, veg: true, desc: 'Rich chocolate milkshake topped with chips.' },
  { id: 8, name: 'Chocolate Dessert Bowl', category: 'Dessert', price: 249, rating: 4.9, time: '8 min', image: foodImages.dessert, veg: true, bestseller: true, desc: 'Chocolate crumble, sauce and a creamy dessert center.' },
];

function Logo({ compact = false }) {
  return (
    <div className={`logo ${compact ? 'logo--compact' : ''}`} aria-label="CHATak Bowls">
      <img src={logo} alt="CHATak Bowls" />
      {/* <div className="logo-mark"><span>CB</span></div>
      <div className="logo-copy"><strong>CHATak</strong><b>BOWLS</b></div> */}
    </div>
  );
}

function App() {
  const [page, setPage] = useState('home');
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [wifiOpen, setWifiOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState('');
  const table = new URLSearchParams(window.location.search).get('table') || 'T01';

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const filtered = useMemo(() => menuItems.filter(item =>
    (category === 'All' || item.category === category) &&
    item.name.toLowerCase().includes(search.toLowerCase())
  ));

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  function addToCart(item, qty = 1) {
    setCart(current => {
      const found = current.find(x => x.id === item.id);
      if (found) return current.map(x => x.id === item.id ? { ...x, qty: x.qty + qty } : x);
      return [...current, { ...item, qty }];
    });
    setSelected(null);
    setToast(`${item.name} added to cart`);
  }

  function updateQty(id, delta) {
    setCart(current => current.map(item => item.id === id ? { ...item, qty: item.qty + delta } : item).filter(item => item.qty > 0));
  }

  function navigate(next) {
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="logo-button" onClick={() => navigate('home')}><Logo /></button>
        <div className="header-actions">
          <button className="table-chip" onClick={() => setToast(`You are at Table ${table}`)}><Table2 size={17}/><span>Table</span><b>{table}</b></button>
          <button className="icon-button cart-button" onClick={() => setCartOpen(true)} aria-label="Open cart">
            <ShoppingBag size={21}/>{cartCount > 0 && <span>{cartCount}</span>}
          </button>
        </div>
      </header>

      <main>
        {page === 'home' && <HomePage navigate={navigate} table={table} setSearch={setSearch} search={search} setCategory={setCategory} setSelected={setSelected} />}
        {page === 'menu' && <MenuPage items={filtered} categories={categories} category={category} setCategory={setCategory} search={search} setSearch={setSearch} setSelected={setSelected} />}
        {page === 'games' && <GamesPage setToast={setToast} />}
        {page === 'rewards' && <RewardsPage setToast={setToast} />}
        {page === 'tracking' && <TrackingPage />}
      </main>

      <nav className="bottom-nav" aria-label="Main navigation">
        <button className={page === 'home' ? 'active' : ''} onClick={() => navigate('home')}><Home/><span>Home</span></button>
        <button className={page === 'menu' ? 'active' : ''} onClick={() => navigate('menu')}><UtensilsCrossed/><span>Menu</span></button>
        <button className={page === 'games' ? 'active' : ''} onClick={() => navigate('games')}><Gamepad2/><span>Games</span></button>
        <button className={page === 'rewards' ? 'active' : ''} onClick={() => navigate('rewards')}><Gift/><span>Rewards</span></button>
      </nav>

      {cartCount > 0 && <button className="sticky-cart" onClick={() => setCartOpen(true)}>
        <div><ShoppingBag size={20}/><b>{cartCount} {cartCount === 1 ? 'item' : 'items'}</b></div>
        <strong>View Cart <span>₹{cartTotal}</span></strong>
      </button>}

      <button className="help-fab" onClick={() => setHelpOpen(true)}><HelpCircle/><span>Help</span></button>

      {selected && <ProductModal item={selected} onClose={() => setSelected(null)} onAdd={addToCart} />}
      {cartOpen && <CartDrawer cart={cart} table={table} total={cartTotal} updateQty={updateQty} onClose={() => setCartOpen(false)} onOrder={() => { setCartOpen(false); navigate('tracking'); setToast('Demo order placed'); }} />}
      {helpOpen && <HelpDrawer table={table} onClose={() => setHelpOpen(false)} setToast={setToast} />}
      {wifiOpen && <WifiModal onClose={() => setWifiOpen(false)} setToast={setToast} />}
      {toast && <div className="toast"><Check size={17}/>{toast}</div>}

      <button className="wifi-button" onClick={() => setWifiOpen(true)}><Wifi size={18}/><span>FREE WI-FI</span></button>
    </div>
  );
}

function HomePage({ navigate, table, setSearch, search, setCategory, setSelected }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span>●</span> NOW SERVING AT TABLE {table}</div>
          <h1>GOOD FOOD.<br/><em>GREAT MOOD.</em></h1>
          <p>Your cravings deserve something special.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => navigate('menu')}>Explore Menu <ChevronRight size={18}/></button>
            <button className="outline-button" onClick={() => navigate('menu')}>Today&apos;s Deals</button>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-bowl"><img src={foodImages.fries} alt="Loaded fries"/></div>
          <div className="hero-rating"><Star fill="#F5B942" color="#F5B942" size={16}/><strong>4.8</strong><span>1.2k reviews</span></div>
        </div>
      </section>

      <section className="section search-section">
        <label className="search-box"><Search size={20}/><input value={search} onChange={e => setSearch(e.target.value)} onFocus={() => navigate('menu')} placeholder="What are you craving today?"/></label>
      </section>

      <section className="section">
        <div className="section-heading"><div><span>EXPLORE</span><h2>Food Categories</h2></div><button onClick={() => navigate('menu')}>View all <ChevronRight size={16}/></button></div>
        <div className="category-row">
          {[
            ['Fries','🔥',foodImages.fries], ['Burgers','🍔',foodImages.burger], ['Sandwich','🥪',foodImages.sandwich],
            ['Pasta','🍝',foodImages.pasta], ['Dessert','🍫',foodImages.dessert], ['Drinks','🥤',foodImages.coffee]
          ].map(([name, icon, image]) => (
            <button key={name} onClick={() => { setCategory(name); navigate('menu'); }} className="category-card">
              <div><img src={image} alt="" /></div><strong>{icon} {name}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="deal-banner">
          <div><span><BadgePercent size={16}/> TODAY&apos;S SPECIAL</span><h2>Buy 1 Burger<br/>Get 1 Fries FREE</h2><p>Only for dine-in guests</p></div>
          <button onClick={() => navigate('menu')}>Grab the deal</button>
          <div className="deal-price"><b>30%</b><span>OFF</span></div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading"><div><span>FAN FAVORITES</span><h2>Popular Dishes</h2></div><button onClick={() => navigate('menu')}>See all <ChevronRight size={16}/></button></div>
        <div className="food-grid">{menuItems.slice(0,4).map(item => <FoodCard key={item.id} item={item} onSelect={() => setSelected(item)}/>)}</div>
      </section>

      <section className="section review-strip">
        <div><div className="stars">★★★★★</div><strong>4.8 out of 5</strong><p>“Great food, quick service and a really fun vibe!”</p></div>
        <button onClick={() => navigate('tracking')}>Our Experience <ChevronRight size={16}/></button>
      </section>
    </>
  );
}

function MenuPage({ items, categories, category, setCategory, search, setSearch, setSelected }) {
  return (
    <section className="menu-page">
      <div className="menu-title"><div><span>OUR MENU</span><h1>Choose your craving</h1></div><span className="sample-label">Demo menu</span></div>
      <label className="search-box"><Search size={20}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search dishes"/></label>
      <div className="menu-category-row">{categories.map(name => <button key={name} className={category === name ? 'active' : ''} onClick={() => setCategory(name)}>{name}</button>)}</div>
      <div className="food-grid menu-grid">{items.map(item => <FoodCard key={item.id} item={item} onSelect={() => setSelected(item)}/>)}</div>
      {items.length === 0 && <div className="empty-state"><Search size={36}/><h3>No dishes found</h3><p>Try another search or category.</p></div>}
    </section>
  );
}

function FoodCard({ item, onSelect }) {
  return (
    <article className="food-card">
      <button className="food-image" onClick={onSelect}>
        <img src={item.image} alt={item.name}/>
        {item.bestseller && <span className="bestseller">Bestseller</span>}
        <span className={`veg-dot ${item.veg ? 'veg' : 'nonveg'}`}></span>
      </button>
      <div className="food-info">
        <button className="heart" aria-label="Save"><Heart size={17}/></button>
        <h3>{item.name}</h3>
        <p>{item.desc}</p>
        <div className="food-meta"><span><Star fill="#F5B942" color="#F5B942" size={14}/>{item.rating}</span><span><Clock3 size={14}/>{item.time}</span></div>
        <div className="food-bottom"><div className="price"><strong>₹{item.price}</strong>{item.oldPrice && <del>₹{item.oldPrice}</del>}</div><button onClick={onSelect}>Add <Plus size={16}/></button></div>
      </div>
    </article>
  );
}

function ProductModal({ item, onClose, onAdd }) {
  const [spice, setSpice] = useState('Medium');
  const [size, setSize] = useState('Regular');
  const [cheese, setCheese] = useState(false);
  const [qty, setQty] = useState(1);
  const total = item.price + (size === 'Large' ? 40 : size === 'Medium' ? 20 : 0) + (cheese ? 30 : 0);

  return (
    <div className="overlay" onMouseDown={onClose}>
      <div className="product-modal" onMouseDown={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X/></button>
        <div className="product-image"><img src={item.image} alt={item.name}/></div>
        <div className="product-content">
          <span className="product-category">{item.category}</span>
          <h2>{item.name}</h2><p>{item.desc}</p>
          <div className="option-block"><div className="option-title"><strong>Spice level</strong><span>Required</span></div><div className="pills">{['No Spice','Mild','Medium','Hot','Extra Hot'].map(x => <button key={x} className={spice === x ? 'active' : ''} onClick={() => setSpice(x)}>{x}</button>)}</div></div>
          <div className="option-block"><div className="option-title"><strong>Size</strong><span>Choose one</span></div><div className="size-options">{[['Regular',0],['Medium',20],['Large',40]].map(([x,p]) => <button key={x} className={size === x ? 'active' : ''} onClick={() => setSize(x)}><span>{x}</span><b>{p ? `+₹${p}` : 'Base'}</b></button>)}</div></div>
          <label className="addon"><div><span>Add extra cheese</span><small>More cheesy goodness</small></div><b>+₹30</b><input type="checkbox" checked={cheese} onChange={e => setCheese(e.target.checked)}/></label>
          <textarea aria-label="Special instructions" placeholder="Any special instructions for your food?"/>
          <div className="product-submit"><div className="qty-control"><button onClick={() => setQty(q => Math.max(1,q-1))}><Minus/></button><b>{qty}</b><button onClick={() => setQty(q => q+1)}><Plus/></button></div><button className="primary-button" onClick={() => onAdd({...item, price: total}, qty)}>Add • ₹{total * qty}</button></div>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ cart, table, total, updateQty, onClose, onOrder }) {
  const [timing, setTiming] = useState('ASAP');
  const tax = Math.round(total * 0.05);
  return (
    <div className="overlay drawer-overlay" onMouseDown={onClose}>
      <aside className="cart-drawer" onMouseDown={e => e.stopPropagation()}>
        <div className="drawer-header"><div><span>YOUR ORDER</span><h2>Table {table}</h2></div><button onClick={onClose}><X/></button></div>
        <div className="cart-list">
          {cart.length === 0 ? <div className="empty-cart"><ShoppingBag/><h3>Your cart is empty</h3><p>Add something tasty to get started.</p></div> : cart.map(item =>
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt=""/>
              <div className="cart-item-copy"><h4>{item.name}</h4><span>Medium • Regular spice</span><strong>₹{item.price * item.qty}</strong></div>
              <div className="qty-control small"><button onClick={() => updateQty(item.id,-1)}><Minus/></button><b>{item.qty}</b><button onClick={() => updateQty(item.id,1)}><Plus/></button></div>
            </div>
          )}
        </div>
        {cart.length > 0 && <>
          <div className="timing-block"><strong>When should we prepare it?</strong><div className="timing-options">{['ASAP','Standard','Schedule Later'].map(x => <button key={x} className={timing === x ? 'active' : ''} onClick={() => setTiming(x)}><Clock3 size={16}/><span>{x}</span><small>{x === 'ASAP' ? 'As soon as possible' : x === 'Standard' ? '~20–25 min' : 'Choose a time'}</small></button>)}</div></div>
          <div className="bill"><div><span>Item total</span><b>₹{total}</b></div><div><span>Taxes & charges</span><b>₹{tax}</b></div><div className="bill-total"><span>To pay</span><b>₹{total + tax}</b></div></div>
          <button className="place-order" onClick={onOrder}>Place Demo Order <span>₹{total + tax}</span></button>
          <p className="demo-note">Static demo — no real payment will be processed.</p>
        </>}
      </aside>
    </div>
  );
}

function HelpDrawer({ table, onClose, setToast }) {
  const options = ['Call Waiter','Request Water','Extra Plates','Request Cutlery','Request Bill','Report a Problem'];
  return (
    <div className="overlay drawer-overlay" onMouseDown={onClose}>
      <aside className="help-drawer" onMouseDown={e => e.stopPropagation()}>
        <div className="drawer-header"><div><span>TABLE {table}</span><h2>How can we help?</h2></div><button onClick={onClose}><X/></button></div>
        <div className="help-grid">{options.map((option,i) => <button key={option} onClick={() => { setToast(`${option} request submitted`); onClose(); }}><span>{i === 0 ? '🧑‍🍳' : i === 1 ? '💧' : i === 2 ? '🍽️' : i === 3 ? '🥢' : i === 4 ? '🧾' : '⚠️'}</span><strong>{option}</strong><ChevronRight/></button>)}</div>
      </aside>
    </div>
  );
}

function WifiModal({ onClose, setToast }) {
  const [revealed, setRevealed] = useState(false);
  async function copyPassword() {
    await navigator.clipboard?.writeText('CHATakGuest123');
    setToast('Wi-Fi password copied');
  }
  return (
    <div className="overlay" onMouseDown={onClose}>
      <div className="wifi-modal" onMouseDown={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X/></button>
        <div className="wifi-icon"><Wifi/></div><span>FREE WI-FI</span><h2>Stay connected</h2>
        <div className="wifi-detail"><div><small>Network name</small><strong>CHATak_Guest</strong></div><Wifi size={20}/></div>
        <div className="wifi-detail"><div><small>Password</small><strong>{revealed ? 'CHATakGuest123' : '••••••••••••'}</strong></div><button onClick={() => setRevealed(v => !v)}>{revealed ? 'Hide' : 'Reveal'}</button></div>
        <button className="primary-button full" onClick={copyPassword}><Copy size={18}/> Copy password</button>
        <p>Demo credentials — managed by the restaurant in production.</p>
      </div>
    </div>
  );
}

function GamesPage({ setToast }) {
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const checkAnswer = value => {
    setAnswer(value);
    if (value === 'Pasta') setScore(100);
  };
  return (
    <section className="inner-page games-page">
      <div className="page-heading"><div><span>PLAY & HAVE FUN!</span><h1>Games & rewards</h1></div><div className="score-pill"><Trophy/><strong>{score}</strong><span>pts</span></div></div>
      <div className="game-feature">
        <div className="game-copy"><span className="live-tag">SOLO CHALLENGE</span><h2>Guess the Dish</h2><p>Can you identify today&apos;s mystery dish?</p><div className="game-options">{['Pasta','Burger','Momos'].map(x => <button key={x} className={answer === x ? (x === 'Pasta' ? 'correct' : 'wrong') : ''} onClick={() => checkAnswer(x)}>{x}{answer === x && (x === 'Pasta' ? <Check/> : <X/>)}{answer && x === 'Pasta' && answer !== 'Pasta' ? <Check/> : null}</button>)}</div>{answer && <div className={answer === 'Pasta' ? 'game-result win' : 'game-result'}>{answer === 'Pasta' ? 'Perfect! +100 points' : 'Good try! The answer is Pasta.'}</div>}</div>
        <div className="game-visual"><img src={foodImages.pasta} alt="Mystery dish"/><div className="lock-badge"><Star/></div></div>
      </div>
      <div className="game-cards"><button onClick={() => setToast('Spin the wheel coming up!')}><div className="game-card-icon orange"><Zap/></div><div><h3>Spin the Wheel</h3><p>Win a surprise reward</p></div><ChevronRight/></button><button onClick={() => setToast('Trivia quiz coming up!')}><div className="game-card-icon red"><Info/></div><div><h3>Food Trivia</h3><p>Test your food knowledge</p></div><ChevronRight/></button></div>
      <div className="multiplayer-banner"><div><span>MULTIPLAYER</span><h2>Play with other tables</h2><p>Create or join a live quiz room.</p></div><button onClick={() => setToast('Game room T01-CHAT created')}>Create room</button></div>
    </section>
  );
}

function RewardsPage({ setToast }) {
  const rewards = [
    {name:'Free Cold Coffee',points:150,icon:'🥤',color:'orange'},
    {name:'₹100 Off',points:300,icon:'₹',color:'gold'},
    {name:'Free Dessert',points:500,icon:'🍰',color:'red'},
  ];
  return (
    <section className="inner-page rewards-page">
      <div className="page-heading"><div><span>CHATak REWARDS</span><h1>Good food, great points</h1></div></div>
      <div className="rewards-summary"><div><span>Available balance</span><strong>320 <small>pts</small></strong><p>Silver member</p></div><div className="points-ring"><b>320</b><span>/500</span></div></div>
      <div className="progress-card"><div><strong>320 points</strong><span>180 points to Gold</span></div><div className="progress-track"><span/></div></div>
      <div className="section-heading"><div><span>REDEEM</span><h2>Available Rewards</h2></div></div>
      <div className="reward-grid">{rewards.map(reward => <article className="reward-card" key={reward.name}><div className={`reward-icon ${reward.color}`}>{reward.icon}</div><h3>{reward.name}</h3><p>{reward.points} reward points</p><button onClick={() => setToast(`${reward.name} selected for redemption`)}>Redeem</button></article>)}</div>
      <div className="history-card"><div className="section-heading"><div><h2>Recent activity</h2></div></div><div className="history-row"><div className="history-icon">+</div><div><strong>Order completed</strong><span>Today, 1:25 PM</span></div><b>+48 pts</b></div><div className="history-row"><div className="history-icon redeem">−</div><div><strong>Cold Coffee redeemed</strong><span>Yesterday</span></div><b className="minus">−150 pts</b></div></div>
    </section>
  );
}

function TrackingPage() {
  const [stage,setStage] = useState(1);
  useEffect(() => {
    const timer = setInterval(() => setStage(s => s < 2 ? s + 1 : s), 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="inner-page tracking-page">
      <div className="page-heading"><div><span>LIVE ORDER</span><h1>Your food is on the way</h1></div></div>
      <div className="order-card"><div className="order-card-head"><div><span>ORDER #CB2401</span><h2>Table T01</h2></div><span className="preparing">Preparing</span></div><div className="tracker">{['Order Received','Preparing Food','Ready to Serve'].map((x,i)=><div className={i <= stage ? 'done' : ''} key={x}><div className="track-dot">{i < stage ? <Check/> : i + 1}</div><span>{x}</span></div>)}</div><div className="estimate"><Clock3/><div><small>Estimated time</small><strong>{stage === 2 ? 'Ready now' : '12–18 minutes'}</strong></div></div></div>
      <div className="order-items"><h3>Order summary</h3><div><img src={foodImages.burger} alt=""/><span><b>Chatak Cheese Burger</b><small>1 × Regular</small></span><strong>₹189</strong></div><div><img src={foodImages.fries} alt=""/><span><b>Peri Peri Loaded Fries</b><small>1 × Medium</small></span><strong>₹249</strong></div></div>
      <div className="rating-card"><span>HOW WAS YOUR CHATak EXPERIENCE?</span><div className="rating-stars">{[1,2,3,4,5].map(n => <button key={n}><Star/></button>)}</div><textarea placeholder="Share your feedback..."/><button className="primary-button full">Submit review</button></div>
    </section>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
