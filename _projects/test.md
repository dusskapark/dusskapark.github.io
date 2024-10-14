# Original deck of 'Figma Autoname Plugin'


![Cover image](https://i.ibb.co/f9zw4j0/showcase.png)

Your today’s problem with this “Frame 563” is not really renaming it properly to “Button”, it’s more about the 562 other frames you have
to rename too. This plugin is an experiment to solve your problem right here, right now. Prototyped in a few nights in Paris by
[Hugo](https://www.hugoduprez.com/),
the usage of the plugin is completely free. The code is Open Source, that way all designers and developers can make
it better and finally, have more pleasure doing their work.

## 🎁 Features

- Rename selected layers and their child.
- Optional start in debug mode.
- Change the model URL.



## ⚙️ Technology

[Svelte](https://svelte.dev/), [Typescript](https://www.typescriptlang.org/),
[TailwindCSS](https://tailwindcss.com/), [Teachable Machine](https://teachablemachine.withgoogle.com/),
[Tensorflow](https://www.tensorflow.org/js?hl=fr)



## ⚙️ Change the model URL

![Change model URL interface](./images/changeModel.png)

To change the TFJS model, please click on the ⚙ button Iand enter the new model URL. The model must have both the model.json and metadata.json file in the root.

```
https://teachablemachine.withgoogle.com/models/<your-model>/
├─ model.json
├─ metadata.json
└─ ...
```

To reset the model URL, please click on the ↻ reset button. 

## 🤝 Contributing

Contributions are welcome! You can contribute by many ways :)

- Improve the code or the model.
- Suggest design & interface changes.
- Share the plugin in your newsletter.
- Write articles & papers about the project.
- Help designers learn coding.
- Help developers learn designing.

If you want to dive into the code and suggest changes, please refer to
[this](https://opensource.guide/how-to-contribute/#opening-a-pull-request).



## 📝 Troubleshooting

- npm install fails with error code 1: [link](https://github.com/Hugo-Dz/figma_autoname_client_app/issues/4)
- ...


## 🍕 Community

You want to share & learn about the intersection between design & code? Stay tuned to our up coming Discord channel!
## ❤️ Credits

Special thanks to [Tom Quinonero](https://github.com/tomquinonero) for the Svelte boilerplate!
## ✉️ Support

For support, email duprez.hugo@gmail.com.


## ⚖️ License

[MIT](https://choosealicense.com/licenses/mit/) Copyright © 2022 Hugo Duprez



# My contribution journey

Since I inspired by the idea of the Figma Autoname plugin, I decided to contribute to this project. I have made some improvements to the plugin, and I am excited to share my journey with you. The below stoies are my contribution explanation text for each iteration. I hope you enjoy it.

## Iteration 1

Hello, everyone. Today, I'd like to introduce you to the Figma Autoname plugin and showcase some exciting updates that I've contributed to. AI and computer vision technologies advancing rapidly though, the design ecosystem is yet to fully integrate these cutting-edge features into our daily designer workflows due to many reasons. This is precisely why the concept behind the Autoname plugin caught my attention. The purpose of this plugin is to automatically rename elements in Figma using TensorFlow's image classification API. This helps prevent confusion for engineers who receive lengthy node names on Figma like Group 1 1 1 or Frame 2 2 2. Isn't it Good, Right? No more dealing with those messy numbers! Here's a quick overview of the pipeline, and I decided to contribute this open source by adding two new features to enhance this simple yet powerful workflow: One is the ability to replace the AI model with a custom-trained model based on each company's design system. And second is the ability to export data to Google Sheets. With these updates, designers can automatically rename layers or groups using familiar names from their design systems. On the other hand, design system teams can automate their user researches. As you all know, managing design systems often involves detaching components for specific use cases, which can be challenging. Unfortunately, Figma's Detach analytics have been limited, leaving designers in the dark about the reasons and methods behind component detachment. That's why I believe this plugin can also serve as a background research tool to alleviate the burden on design system managers. In short, It not only provides AI-powered auto rename functionality but also collects image data. This data can shed light on the reasons behind component detachment and help inform upgrade plans for components that meet specific needs. Now, let me demo my prototype: I'll use the AI to rename layers with these complicated numerical names. In the settings page, we can see the AI model URL and Excel download options, and we can save our preferences. The Google Sheet integration was a bit complex, so in this version, I've initially added a feature to download the Excel file instead. When we run the plugin, the layers get neatly renamed with the terminology from the design system, and the result file is downloaded. Upon opening the file, we can find the image slices used for renaming, the predicted component names, and their corresponding probabilities. Pretty neat, isn't it? I believe this plugin will have two positive impacts on our everyday design tasks: Firstly, the external impact will be an improvement in the developer experience. Well-organized layer or group names often have a more positive impact on the developer's inspector of Figma Dev-mode. I believe this effort can smooth the handover process between developers and designers. Secondly, the internal impact is that we can automate user research within the design system. Instead of conducting manual interviews with designers, the design system team can leverage this automatically generated information to identify frequently detached components and plan upgrades based on specific needs. The features I showcased today will be soon accessible on the Figma plugin site. This project is fully open-source, and we greatly appreciate your involvement and interest. Kindly visit the website below to share your ideas. Your contribution will make a significant impact. Thank you

## Iteration 2

Hello, everyone. Today, I'd like to contribute an exciting upgrade to the Figma Autoname plugin. Figma Autoname is a TensorFlow-based free plugin that liberates both developers and designers from the hassle of dealing with complex names like Frame blah blah or Group blah blah blah. Well... Over the past few months, I've been using this plugin extensively and conducting interviews with, well, many designer and developer users. They all enjoyed this fantastic free plugin, uh, intriguing but highlighted two crucial points that were still, you know, lacking. Firstly, they emphasized the need for customization to make the plugin work specifically for them, rather than simply detecting, you know, general UI elements. For instance, designers using the Material Design system wanted the names to align with the terminology of that system rather than being renamed according to a different design system. The second point was that, while the plugin appeared to be a neat tool for tidying up Figma's left panel, they didn't feel a strong, um, motivation to use it in their real-world workflow. Based on this feedback, I've decided to contribute to address these user needs and take a step further. Firstly, I have been working on implementing a feature that automatically extracts dummy data from component sets using Figma's plugin API and various technologies. Additionally, I've been experimenting with custom ML model training, aiming to make it, umm... you know, it's incredibly easy for anyone to create AI models tailored to their specific design system with just one or two clicks. If the experiments prove successful, I'll contribute this feature to the community, along with guides and code, to enable, well, effortless web AI model creation. After custom model training, the plugin now renames Frames according to the trained design system's terminologies. But....I didn't stop there, though. I've taken it a step further by incorporating, uh, a magical transformation into Figma's right panel. This enhancement aims to, uh, seamlessly enhance the user experience, especially for, you know, developers. Thanks to Figma Dev mode, developers now have access to the data generated during the Autoname process in the right panel. This means that even when designers detached components due to, you know, minor edits or unavoidable reasons, developers can still, um, harness the power of the design system with the assistance of AI power. Now the Figma AutoName plugin not only automatically organizes the designer's left panel based on a customized design system, but also provides very useful information to the right panel of dev mode. Is it cool, huh? Figma AutoName remains committed to a serverless, cost-free approach and continues to focus on bringing AI power into the world of design systems to, uh, boost our productivity. This plugin still relies on the support of the open-source community and, uh, eagerly awaits your involvement. Thank you for your attention, and I look forward to your contributions to this, uh, exciting project.

## Iteration 3

Hello! After some...., well, pretty rapid developments in just one day, I've decided to reshoot this video to, you know, provide a more accurate representation of the latest updates. We were discussing the concept of exposing or concealing the base URL to users, correct? But, um... I've had some fundamental reservations about this aspect, which is why I went back to the drawing board to explore a different method of delivering the same functionality without exposing the input field. Fortunately, I found a solution, and I've successfully, kinda... umm..., upgraded the plugin to support Dev mode with a straightforward modification of the TensorFlow model's URL. Let's consider a role-play scenario from the perspective of a junior designer, so, sort of, you can better understand how this all works. When the juniors first run the plugin, they'll notice that the previously created and distributed Teachable Machine's URL is, you know, pre-set, allowing them to rename all frames with just a single click. Under this default configuration, there's no visible change when they switch to Dev mode as usual. However, suppose their design manager has customized a new URL for the company's design system, intending to offer Dev mode support. In this case, the scenario changes. The junior designer's task remains simple... well, they just update the URL, but the new model provides enhanced naming based on design system classes while offering their frontend engineers the advantages of this AI-powered functionality on the right-side panel of Figma. So, it's kind of a win-win for everyone involved.



