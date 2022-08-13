---
title: Food ordering app
subtitle: SIDE PROJECT (2018)
date: 2018-12-01 00:00:00
description: Orderbook(모두의 주문) is a service that customers order directly from the table with a mobile QR code.
accent_color: '#4C60E6'
featured_image: /2018-orderbook/logostory2018-002.png
gallery_images: 
    - /2018-orderbook/logostory2018-001.png
team:  David (Lead), Kevin, Maxx, Sungvin, JooHyung (me)
role: Product Designer and React Engineer
visible: true
---

Have you ever been annoyed or tired of having to wait in a long line when ordering food at a restaurant? Orderbook(모두의 주문) is a service that customers order directly from the table with a mobile QR code. 

- Live at: [https://orderbook.logostory.io/#/](https://orderbook.logostory.io/#/?shopId=2)
- Github: [https://github.com/logostory](https://github.com/logostory)

![orderbook](/images/projects/2018-orderbook/logostory2018-001.png)

----

![](/images/projects/Portfolio/Portfolio.003.png)


As my first side project at LOGO Cording club, we decided to design a service that applies to us. Right after the meeting, we could not decide what food should we order for the team lunch and tired of waiting in a long line. Let's build a food ordering service that makes it easy for anyone to find a menu, choose food, and order directly. Main contributed in UI design and React component development. I also participated in ideation, wireframing, and flow chart. 

### Brainstorm

At the start of the project, we surveyed similar apps and created a logo design that would be responsible for the consab and brand identity of the logostory app.

**Research**

First, we installed 7 food delivery services such as Yelp to understand each screen and function, and figured out how the functions we were going to create were developed in the real world. (Thanks [Rachel](https://www.facebook.com/profile.php?id=100001894389207))

<a href="https://drive.google.com/open?id=1CDudLoe4XduV3w6YqFFZDdFro8UYA877" class="button--fill" target="_blank">See more detail</a>


{% include post-components/gallery.html
	columns = 2
	full_width = true
	images = "/images/projects/2018-orderbook/benchmarking0.png, /images/projects/2018-orderbook/benchmarking3.png, /images/projects/2018-orderbook/benchmarking4.png, /images/projects/2018-orderbook/benchmarking7.png,
	"
%}

**Design Identity**

Next, [Glory](https://www.facebook.com/youngkwang.cho.90), a designer, creates a logo with the image of ‘building up’ the goal we are pursuing. Next, we prepared the actual design by creating a Material Theme based on this consap.

<a href="https://drive.google.com/open?id=1CDudLoe4XduV3w6YqFFZDdFro8UYA877" class="button--fill" target="_blank">See more detail</a>

{% include post-components/gallery.html
	columns = 2
	full_width = true
	images = "/images/projects/2018-orderbook/logo1-1.png, /images/projects/2018-orderbook/logo1-2.png, /images/projects/2018-orderbook/logo1-3.png, /images/projects/2018-orderbook/logo1-5.png,
	"
%}

### Ideate & Sketch

**PAPER PROTOTYPE USABILITY TEST**

We iterated our wireframe design by conducting informal usability testing with the low-fidelity prototype. Our participants provided feedbacks on error-prevention methods, accessibility, and discoverability of the UI.


{% include post-components/gallery.html
	columns = 2
	full_width = true
	images = "/images/projects/2018-orderbook/logostory2018-007.png, /images/projects/2018-orderbook/logostory2018-008.png, 
	"
%}


**INITIAL UI DESIGN & WIREFRAME**

As I was designing the UI wireframe and components, I realized that the most important function of this app lies on the user flow from camera to checkout. Using [Marvel](https://marvelapp.com/prototype/feib724/screen/50898994?), I tested out different scenarios and finally came up with some solutions. With some external and internal critique, we settled on a QR code based interaction. 

![orderbook](/images/projects/2018-orderbook/logostory2018-001.png)



### Design & Prototype



**Sketch**

![orderbook](/images/projects/2018-orderbook/logostory2018-004.png)


**Zeplin**

<a href="http://zpl.io/aBqe1dO" class="button--fill" target="_blank">See more detail</a>

{% include post-components/gallery.html
	columns = 1
	full_width = true
	images = "/images/projects/2018-orderbook/zeplin-2.png, /images/projects/2018-orderbook/zeplin-3.png, /images/projects/2018-orderbook/zeplin-1.png, 
	"
%}

### Web app implementation 

My teammate lead the implementation in React.js and I helped with React such as QR Code creation rule, component styling based on Material-UI, Redux (shopping cart), and Swagger integration with the backend team.

![orderbook](/images/projects/2018-orderbook/logostory2018-006.png)

![orderbook](/images/projects/2018-orderbook/swagger.png)

![orderbook](/images/projects/2018-orderbook/develop-env.png)
