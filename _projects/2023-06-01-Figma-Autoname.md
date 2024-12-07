---
title: "Community-Driven AI Advancements:<br>Transforming Figma Autoname for Design Systems"
subtitle: "Figma + AI project (2023)"
date: 2023-06-01 00:00:00
description: "Open source Contribution to the Figma Autoname plugin, integrating TensorFlow.js for advanced design system support and developer collaboration"
featured_image: "2023-figma-autoname/cover.png"
gallery_images: "2023-figma-autoname/cover.png"
team: Hugo(Original Author), JooHyung(FE Developer & Contributor)
role: FE Developer & Open Source Contributor
visible: true
---

<div style="font-style: italic; font-weight: bold; margin: 20px 0; padding: 10px; background-color: #f0f8ff; border-left: 4px solid #4CAF50;">
  <h5>Before Figma AI's 'Rename layers' feature took center stage, an open-source initiative was breaking new ground. What inspired me to inject my AI prowess into this venture, and what impact could it have on the Figma design ecosystem?</h5>
</div>

## Origins and Motivation

The idea to contribute to the Figma Autoname plugin stemmed from a personal challenge: efficiently managing design systems. The potential of using AI to automate layer naming in Figma was captivating, promising to transform the tedious task of organizing design files into a seamless experience. This fascination was further fueled by the innovative potential of TensorFlow.js, which opened doors to integrating machine learning into design workflows.
<br>
<div style="text-align: center; margin-top: 20px;">
  <a href="https://www.figma.com/community/plugin/1160642826057169962/figma-autoname" target="_blank" style="display: inline-flex; align-items: center; padding: 10px 20px; background-color: #333333; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" alt="Figma Plugin Logo" height="24" style="max-height: 24px; margin-right: 10px;">
    View Figma AutoName
  </a>
</div>
<br>

My journey began with insightful interviews and discussions with fellow designers and developers. These conversations revealed a common struggle: while the plugin offered a novel solution, it lacked the customization needed to align with diverse design systems. Designers yearned for a tool that could adapt to their unique workflows and terminology, rather than a one-size-fits-all approach.

Driven by this feedback, I seized the opportunity to enhance the open-source project. **My mission was clear: to make the plugin more flexible and powerful, supporting custom computer vision models and integrating seamlessly into real-world design processes.** This contribution aimed to bridge the gap between cutting-edge technology and practical application, ultimately making the design process more efficient and collaborative.

## Discovery and Initial Engagement

The journey took a pivotal turn when I discovered the Figma Autoname project on TensorFlow's official YouTube channel. This moment aligned perfectly with my ongoing exploration of integrating AI into design workflows. My previous experiments with TensorFlow.js in design tools had already laid a strong foundation, allowing me to quickly grasp the potential of this innovative application. Motivated by the desire to solve real-world design challenges, I delved deeper into the project, envisioning the possibilities of enhancing the plugin to better serve diverse design systems and workflows, which led to...

### User Interviews and Insights

...a series of interviews with designers and engineers, we identified key limitations of the existing plugin. Users emphasized the need for more customization to fit specific design systems and better integration with real-world workflows. Design system managers also highlighted the lack of features for managing design systems and collaborating with developers.

> **"Need a tool that aligns with our design systems, not just normal 'UI names'."** — Designer

> **"The plugin should integrate seamlessly into our existing workflows and support collaboration with developers."** — Design System Manager

These insights highlighted the necessity for customization and integration, guiding the development of new features to address these needs.

## Technical Contributions

### Enhancing the Plugin

To address these needs, I began by forking the project repository, which allowed for innovative development. I enhanced the plugin to support multiple computer vision models using Figma's Plugin API and clientStorage feature. This upgrade enabled users to switch between the default model and custom models from Teachable Machine or TensorFlow.js, offering greater flexibility and adaptability.

The impact of these enhancements was recognized by the community, as highlighted by Hugo Duprez, the original project owner and an award-winning French developer recognized at the TensorFlow Awards. He shared his appreciation on Twitter:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">🚨 Import your own <a href="https://twitter.com/TensorFlow?ref_src=twsrc%5Etfw">@TensorFlow</a> JS model into the Figma Autoname plugin⚡️ Thanks <a href="https://twitter.com/dusskapark?ref_src=twsrc%5Etfw">@dusskapark</a> for the implementation!<br><br>👉 Rename your layers with a model trained on your design components<br>👉 Run locally, no server calls, 0 cost<a href="https://twitter.com/jason_mayes?ref_src=twsrc%5Etfw">@jason_mayes</a> <a href="https://twitter.com/carrycooldude?ref_src=twsrc%5Etfw">@carrycooldude</a> <a href="https://twitter.com/googledevs?ref_src=twsrc%5Etfw">@googledevs</a> <a href="https://t.co/Gc8sy7Q1jp">pic.twitter.com/Gc8sy7Q1jp</a></p>— Hugo Duprez (@HugoDuprez) <a href="https://twitter.com/HugoDuprez/status/1681681562998304768?ref_src=twsrc%5Etfw">July 19, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


### Development of Supporting Tools

In collaboration with Hugo Duprez, the original project owner, I focused on integrating TensorFlow.js to enable the creation of custom models, enhancing the plugin's flexibility. I developed the "Figma Dummy Gen" plugin, which extracts UI image "building blocks" from design libraries. This tool allows design system managers to generate datasets tailored to their specific needs.

{% include post-components/gallery.html
   columns = 1
   full_width = false
   images = "../images/projects/2023-figma-autoname/markdown002.gif"
%}

<br>
<div style="text-align: center; margin-top: 20px;">
  <a href="https://www.figma.com/community/plugin/1305913695776615924/figma-dummy-generator" target="_blank" style="display: inline-flex; align-items: center; padding: 10px 20px; background-color: #333333; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" alt="Figma Plugin Logo" height="24" style="max-height: 24px; margin-right: 10px;">
    View Figma Dummy generator
  </a>
</div>
<br>

To further simplify the model training process, I created a Python Jupyter Notebook that guides users through the steps of training a custom vision model using TensorFlow.js. This notebook is designed to be beginner-friendly, providing clear instructions and explanations to help users understand the underlying principles of machine learning.



{% include post-components/gallery.html
   columns = 1
   full_width = false
   images = "../images/projects/2023-figma-autoname/Portfolio.036.png"
%}

  
  <div style="text-align: center; margin-top: 20px;">
    <a href="https://github.com/FigmaAI/figma-dummy-gen/blob/main/classification.ipynb" target="_blank" style="display: inline-flex; align-items: center; padding: 10px 20px; background-color: #333333; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Google_Colaboratory_SVG_Logo.svg/512px-Google_Colaboratory_SVG_Logo.svg.png?20221103151432" alt="Google Colab Logo"  style="max-height: 24px; margin-right: 10px;">
      View Google Colab Notebook
    </a>
  </div>
  

### And Supportting DevMode as well

With the ability to apply custom models now in place, I also tried to utilize those result to enhance the DevMode experience. Nodes renamed using AutoName now display an additional link in Figma's DevMode. This link directs engineers to the relevant design system's API guide, ensuring they have quick access to necessary documentation. **This feature is designed to streamline the developer workflow and foster better collaboration between designers and engineers.**

{% include post-components/gallery.html
   columns = 1
   full_width = false
   images = "../images/projects/2023-figma-autoname/markdown004.gif"
   caption="Example of the DevMode feature."
%}

This integration empowers users to import and use their own models, showcasing the impact of open-source innovation. Our collaborative efforts ensured that these enhancements were robust and met community needs.

## Impact on the Community

The open-source contribution enabling model replacement in the Figma Autoname plugin has led to unexpected and innovative use cases. For instance, some users have developed models to distinguish between filled and outlined icon sets, showcasing the plugin's versatility and adaptability to specific design needs.

The capability to create custom models for design systems was also explored internally at Grab Singapore. This was not an official company project but rather an experimental side project conducted with a UX engineer. We extracted building blocks from our design system and trained a model specifically tailored to our design requirements. This model was then deployed in our internal Figma plugin store, allowing our designers to seamlessly integrate it into their workflows.

{% include post-components/gallery.html
   columns = 1
   full_width = false
   images = "../images/projects/2023-figma-autoname/Portfolio.038.png"
   caption="A Python notebook for training TensorFlow JS model via using Figma-dummy-gen dataset."
%}
  

I shared it at our company's monthly design meeting, 'Design ThursDay'. This was a chance to show all Grab designers the changes and get their thoughts on how well the plugin solved the earlier problems. The presentation, accompanied by the video below, was well-received and applauded by my peers.

{% include post-components/video.html
   full_width = false
   url = "https://www.youtube.com/embed/x2Hn0qNXakA?si=MOB5ptl_9mW0R5c1"
   caption="A presentation deck for explaining my contributions to the Figma Autoname plugin. (Oct 2023)"
%}


Even though there were some worries about how accurate and fast the computer vision model was, most people were excited about this design system-friendly feature. The feedback showed that adding custom model support and DevMode integration was a good move. This positive reaction encouraged us to keep improving the plugin.

## Lessons Learned

Throughout this journey, we actively engaged in discussions and development, but unfortunately, our motivation waned when Figma announced that the Rename layers feature would become a native part of their platform. As a result, I've decided to pause my contributions to this open-source project for now ([link](https://www.linkedin.com/posts/dusskapark_figma-ai-rename-your-layers-and-more-figma-activity-7211975137204559872-3Sab)).

While it's a bit disappointing, I'm not disheartened. Participating in the development of this plugin taught me a lot about **collaboration within the open-source ecosystem**. Creating both internal and community versions of the plugin allowed me to connect with designers and members of the broader design community, providing a platform to hear diverse perspectives and feedback. This experience has been invaluable and is perhaps the most significant asset I've gained from this project.

Through this process, I learned the importance of adaptability and resilience in the face of changing circumstances. I also realized the value of community engagement and the impact of open-source contributions on personal and professional growth. These lessons will undoubtedly guide me in future endeavors, whether in open-source projects or other collaborative efforts.

Thanks Hugo and all the users and contributors for the great journey. I hope to see you again in the future. 🚀

{% include post-components/video.html
   full_width = false
   url = "https://www.youtube.com/embed/2eZeka9gMgA?si=6GmV6B40PQ2zpC9x"
   caption="I whipped up this quirky Apple-style ad to hype up the new update."
%}

