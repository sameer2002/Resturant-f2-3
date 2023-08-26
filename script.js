let order = [];

async function getMenu() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json'); 

        const data = await response.json();
        console.log("Data fetched:", data);
        renderMenu(data);

        return data;
    } catch (error) {
        console.error('Error fetching the menu:', error);
    }
}
const order_cart=document.getElementById('order');
let finalizeButton;
function renderMenu(data) {
    const container = document.getElementById('menuContainer');

    data.slice(0,6).forEach(item => {
        const card = document.createElement('div');
        card.className = 'menuCard';
    
       const img = document.createElement('img');
        img.src = item.imgSrc;

        

        const title = document.createElement('h3');
        title.textContent = item.name;

        const price = document.createElement('p');
        price.textContent = "$ " + item.price;

        const addToOrderButton = document.createElement('button');
        addToOrderButton.className='add_items';
        addToOrderButton.textContent = '+';
        const menu_det= document.createElement('div');
        menu_det.className='menu_det';
        menu_det.appendChild(title);
        menu_det.appendChild(price);

        const card_det= document.createElement('div');
        card_det.className='card_det';
        card_det.appendChild(menu_det);
        card_det.appendChild(addToOrderButton);
        
        addToOrderButton.addEventListener('click', () => {
            addToOrder(item);
        });

        card.appendChild(img);
        card.appendChild(card_det);
        container.appendChild(card);
    });

    finalizeButton = document.createElement('button');
    finalizeButton.className='cart';
    finalizeButton.innerHTML = `<span class="material-symbols-outlined">
    shopping_cart
    </span>Order  (0)`;
    finalizeButton.addEventListener('click', takeFinalOrder);
    order_cart.appendChild(finalizeButton);
}

function addToOrder(item) {
    order.push(item);
    console.log(`Added ${item.name} to the order.`);
    finalizeButton.innerHTML = `<span class="material-symbols-outlined">
    shopping_cart
    </span>Order  (${order.length})`;
    
}

async function takeFinalOrder() {
    if (order.length === 0) {
        alert('Please add items to your order before finalizing.');
        console.log("Please add items to your order before finalizing.");
        return;
    }

    console.log("Finalizing order with the following items:", order);

    try {
        const finalizedOrder = await takeOrder(order);
        const orderStatus = await orderPrep();

        if (!orderStatus.order_status) {
            throw new Error('Order preparation failed');
        }

        const paymentStatus = await payOrder();
        
        if (!paymentStatus.paid) {
            throw new Error('Payment failed');
        }

        thankyouFnc();

    } catch (error) {
        console.error('There was an error processing the order:', error);
    }
}

async function takeOrder(orderArray) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Order received and being processed:", orderArray);
            resolve(orderArray);
        }, 2500);
    });
}

async function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("order preparing");
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

async function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("paid");
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

function thankyouFnc() {
    alert('Thank you for eating with us today!');
}
getMenu();
