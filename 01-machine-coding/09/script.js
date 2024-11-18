// Global variables for price and cid (cash in drawer)
let price = 3.26; // Example price of the item
let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

// Event listener for the purchase button
document.getElementById('purchase-btn').addEventListener('click', function() {
    const cashGiven = parseFloat(document.getElementById('cash').value); // Cash given by customer
    let changeDue = (cashGiven - price).toFixed(2); // Calculate the change due, fixed to 2 decimal places
    let changeArr = []; // Array to hold the change denominations

    // Case 1: If the customer hasn't given enough money
    if (cashGiven < price) {
        alert("Customer does not have enough money to purchase the item");
        document.getElementById('change-due').textContent = '';
        return;
    }

    // Case 2: No change due (exact cash given)
    if (changeDue == 0) {
        document.getElementById('change-due').textContent = "No change due - customer paid with exact cash";
        return;
    }

    // Case 3: Calculate the total amount of cash in the drawer
    let totalCid = cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2); // Total cash in drawer

    // Case 4: If the change due is more than the total available cash in the drawer
    if (parseFloat(changeDue) > parseFloat(totalCid)) {
        document.getElementById('change-due').textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    // Case 5: Exact change check (if the drawer contains exactly the needed change)
    if (parseFloat(changeDue) === parseFloat(totalCid)) {
        let changeString = "Status: CLOSED " + getChangeString(changeDue, cid);
        document.getElementById('change-due').textContent = changeString;
        return;
    }

    // Case 6: Calculate change from the available cash in the drawer
    for (let i = cid.length - 1; i >= 0; i--) {
        const coinName = cid[i][0];
        let coinAmount = cid[i][1];
        let coinValue = getCoinValue(coinName);
        let coinCount = 0;

        // While we can give this coin type and it's within the available amount, subtract from changeDue
        while (parseFloat(changeDue) >= coinValue && coinAmount > 0) {
            changeDue = (parseFloat(changeDue) - coinValue).toFixed(2); // Deduct coin value from change due
            coinAmount -= coinValue; // Deduct the amount available in the drawer
            coinCount++;
        }

        // If we used any of this denomination, push it into the changeArr
        if (coinCount > 0) {
            changeArr.push([coinName, (coinCount * coinValue).toFixed(2)]);
        }
    }

    // If there’s still change left due (couldn't match the exact change)
    if (parseFloat(changeDue) > 0) {
        document.getElementById('change-due').textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    // Format and return the change in the correct format
    let changeStr = "Status: OPEN ";
    changeArr.sort((a, b) => b[1] - a[1]); // Sort the change denominations from highest to lowest

    changeArr.forEach(coin => {
        changeStr += `${coin[0]}: $${coin[1]} `;
    });

    // Set the result to the #change-due element
    document.getElementById('change-due').textContent = changeStr.trim();
});

// Helper function to get the value of a coin/bill
function getCoinValue(coinName) {
    switch (coinName) {
        case "PENNY": return 0.01;
        case "NICKEL": return 0.05;
        case "DIME": return 0.1;
        case "QUARTER": return 0.25;
        case "ONE": return 1;
        case "FIVE": return 5;
        case "TEN": return 10;
        case "TWENTY": return 20;
        case "ONE HUNDRED": return 100;
        default: return 0;
    }
}

// Helper function to format the exact change string when the drawer has exact money
function getChangeString(changeDue, cid) {
    let changeArr = [];
    for (let i = cid.length - 1; i >= 0; i--) {
        let coinName = cid[i][0];
        let coinAmount = cid[i][1];
        let coinValue = getCoinValue(coinName);
        let coinCount = 0;

        while (parseFloat(changeDue) >= coinValue && coinAmount > 0) {
            changeDue = (parseFloat(changeDue) - coinValue).toFixed(2);
            coinAmount -= coinValue;
            coinCount++;
        }

        if (coinCount > 0) {
            changeArr.push(`${coinName}: $${(coinCount * coinValue).toFixed(2)}`);
        }
    }

    if (parseFloat(changeDue) > 0) {
        return "INSUFFICIENT_FUNDS";
    }

    return "CLOSED " + changeArr.join(" ");
}
