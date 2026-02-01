# 🎯 Complete Setup Guide for Your Mom's Crochet Website

## What You're Getting

A fully functional e-commerce website where customers can:
- Browse beautiful crochet products
- Add items to shopping cart
- Fill in delivery details
- Click "Place Order" → Automatically opens WhatsApp with order details
- Pay via UPI (no payment gateway fees!)

## 📋 Before You Start - What You Need

1. **Computer** with internet connection
2. **WhatsApp Business** on your mom's phone (or regular WhatsApp)
3. **30 minutes** of your time
4. **No coding knowledge** required! Just follow steps carefully

---

## 🚀 Step-by-Step Setup

### STEP 1: Install Node.js

1. Go to https://nodejs.org
2. Click the big green button that says "Download for Windows" (or Mac)
3. Run the downloaded file
4. Click "Next" → "Next" → "Install"
5. Wait for installation to complete
6. Click "Finish"

**How to verify it worked:**
- Press `Windows Key + R`
- Type `cmd` and press Enter
- Type `node --version` and press Enter
- You should see a version number like `v18.17.0`

### STEP 2: Install VS Code (Code Editor)

1. Go to https://code.visualstudio.com
2. Click "Download for Windows"
3. Run the downloaded file
4. Follow installation steps (just click Next)
5. Open VS Code after installation

### STEP 3: Get the Website Code

**Option A: If you received a ZIP file**
1. Extract the ZIP file to a folder (e.g., Desktop/crochet-store)
2. Open VS Code
3. Click "File" → "Open Folder"
4. Select the extracted folder
5. Click "Select Folder"

**Option B: If you have the files already**
- Just open the folder in VS Code

### STEP 4: Install Dependencies

1. In VS Code, press `Ctrl + ~` (opens terminal at bottom)
2. Type this command and press Enter:
   ```
   npm install
   ```
3. Wait 2-3 minutes for installation to complete
4. You'll see lots of text scrolling - this is normal!

### STEP 5: Update WhatsApp Number (IMPORTANT!)

1. In VS Code, look at the left sidebar (file explorer)
2. Click on `components` folder
3. Click on `Cart.jsx` file
4. Find this line (around line 37):
   ```javascript
   const whatsappNumber = '919876543210';
   ```
5. Replace `919876543210` with your mom's WhatsApp number:
   - Include country code (91 for India)
   - No spaces, no +, no dashes
   - Example: `919876543210` where 91 is country code
6. Press `Ctrl + S` to save

### STEP 6: Run the Website Locally

1. In the VS Code terminal (bottom), type:
   ```
   npm run dev
   ```
2. Wait 10-20 seconds
3. You'll see: `Local: http://localhost:3000`
4. Open your web browser
5. Go to: `http://localhost:3000`
6. 🎉 **Your website is now running!**

### STEP 7: Test Everything

1. **Browse products** - scroll through the page
2. **Add to cart** - click "Add to Cart" on any product
3. **Open cart** - click the Cart button (top right)
4. **Fill details** - enter test name, phone, address
5. **Place order** - click "Place Order on WhatsApp"
6. **Check WhatsApp** - it should open with order message ready to send

✅ If all this works, you're ready to go live!

---

## 🎨 Customization Guide

### Add Your Products

1. Open `data/products.js` in VS Code
2. You'll see 9 sample products
3. To add a new product, copy this template:
   ```javascript
   {
     id: 10, // Increase number for each new product
     name: 'Product Name',
     description: 'Detailed description of the item',
     price: 500, // Price in rupees
     emoji: '🎁', // Choose an emoji
     badge: 'New', // Optional: 'New', 'Popular', or null
     image: null // We'll add images later
   }
   ```
4. Save the file (`Ctrl + S`)
5. Refresh browser to see changes

### Add Product Photos

1. Create a new folder: `crochet-store/public/images`
2. Add your product photos there (name them simply: blanket1.jpg, teddy1.jpg, etc.)
3. In `data/products.js`, update the image field:
   ```javascript
   image: '/images/blanket1.jpg'
   ```
4. Save and refresh!

### Change Business Name & Info

**Business Name (Header):**
1. Open `app/page.jsx`
2. Find line 18 (around there): `Crochet Creations`
3. Change to your mom's business name
4. Save

**About Section:**
1. Same file (`app/page.jsx`)
2. Scroll down to around line 87-104
3. Update the text about your mom's story
4. Save

### Change Colors (Optional)

If you want different colors instead of rose/pink:
1. Open `tailwind.config.js`
2. You can change color scheme here (advanced - ask for help if needed)

---

## 🌐 Making Website Live (Deploy Online)

### Option 1: Vercel (Recommended - FREE)

**Why Vercel?**
- Completely free for personal sites
- Super easy setup
- Automatic updates when you make changes
- Fast and reliable

**Steps:**

1. **Create GitHub Account** (if you don't have one)
   - Go to https://github.com
   - Click "Sign Up"
   - Choose username, email, password
   - Verify email

2. **Upload Code to GitHub**
   - In VS Code terminal, type these commands one by one:
   ```
   git init
   git add .
   git commit -m "My crochet website"
   ```
   - Go to GitHub → Click "+" → "New repository"
   - Name it: `crochet-store`
   - Click "Create repository"
   - Copy the commands they show (under "push an existing repository")
   - Paste them in VS Code terminal
   - Press Enter

3. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "Sign Up with GitHub"
   - Allow access
   - Click "New Project"
   - Select `crochet-store` repository
   - Click "Deploy"
   - Wait 2-3 minutes
   - 🎉 **Your website is LIVE!**

4. **Get Your Website URL**
   - After deployment, you'll see a URL like: `crochet-store-xyz123.vercel.app`
   - This is your live website!
   - Share this link with customers

### Option 2: Custom Domain (Optional)

Want your own domain like `momscrochet.com`?

1. Buy domain from:
   - GoDaddy (₹500-1000/year)
   - Namecheap
   - BigRock (India)

2. In Vercel:
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your domain
   - Follow DNS setup instructions

---

## 📱 Day-to-Day Usage

### When You Get an Order

1. **Customer clicks** "Place Order on WhatsApp"
2. **You receive** WhatsApp message with:
   - Customer name, phone, address
   - Items ordered with quantities
   - Total amount
3. **You reply** with your UPI QR code or UPI ID
4. **Customer pays** and sends screenshot
5. **You confirm** and ship the order!

### Updating Products

1. Open VS Code
2. Open `data/products.js`
3. Add/edit products
4. Save file
5. **If website is live on Vercel:**
   - In terminal: `git add .`
   - Then: `git commit -m "Updated products"`
   - Then: `git push`
   - Vercel automatically updates your live site!

### Changing Prices

1. Open `data/products.js`
2. Find the product
3. Change the `price: 500` to new price
4. Save and push to GitHub (if live)

---

## 🔧 Troubleshooting

**Problem: "npm: command not found"**
- Solution: Node.js not installed properly. Reinstall Node.js

**Problem: Website not loading at localhost:3000**
- Solution: 
  1. Close terminal
  2. Reopen terminal (`Ctrl + ~`)
  3. Type `npm run dev` again

**Problem: WhatsApp not opening**
- Solution: Check WhatsApp number format in `Cart.jsx` - should be `919876543210` format

**Problem: Changes not showing**
- Solution: 
  1. Save file (`Ctrl + S`)
  2. Refresh browser (`Ctrl + R` or `F5`)

**Problem: Can't find a file**
- Solution: Use VS Code's search (`Ctrl + P`) and type filename

---

## 💡 Tips for Success

1. **Take Good Photos**: Customers love seeing actual products
2. **Update Regularly**: Add new products to keep site fresh
3. **Respond Fast**: Quick WhatsApp replies = more sales
4. **Track Orders**: Keep a simple Excel sheet of orders
5. **Ask for Reviews**: Happy customers = great testimonials
6. **Share Link**: Put website link on Instagram, Facebook, etc.

---

## 📊 When to Consider Payment Gateway

Start with WhatsApp checkout. Upgrade to payment gateway when:
- Getting 10+ orders per day
- Manual process becomes overwhelming
- Ready to get PAN/GST registration
- Want fully automated system

At that point:
- Consider Instamojo or Razorpay
- It's just a code update (we can help!)
- Costs ~2% per transaction + need PAN

---

## ❓ Need Help?

**Common Questions:**

Q: Do I need to keep my computer on for website to work?
A: No! Once deployed to Vercel, it runs on their servers 24/7

Q: Can I edit from my phone?
A: Not easily. Use computer for editing, but you can manage WhatsApp orders from phone

Q: What if I make a mistake in code?
A: GitHub saves all versions. You can always go back!

Q: Is this really free?
A: Yes! Vercel is free for personal sites. You might want to buy domain later (₹500-1000/year)

Q: How do I add more products later?
A: Just edit `data/products.js` and push to GitHub. Website updates automatically!

---

## 🎉 You're Ready!

Follow these steps carefully and you'll have a professional website running in under an hour. Your mom's 25 years of craftsmanship deserves a beautiful online presence!

**Remember:**
- Start simple
- Test everything
- Launch and learn
- Improve over time

Good luck! 🧶✨

---

**Quick Reference Commands:**

```bash
# Run website locally
npm run dev

# Update live website
git add .
git commit -m "Description of changes"
git push
```
