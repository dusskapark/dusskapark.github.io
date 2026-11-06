import { Gallery } from "@/components/content";
import { ContentImage, ContentLink } from "@/components/content/content-elements";

export const frontmatter = {"kind":"post","slug":"machine-learning-for-design-systems","title":"Machine Learning for Design Systems","description":"Machine Learning for Design Systems-Training Tensorflow Object Detection API with design system symbols","date":"2020-09-24","lang":"en","listed":true,"hero":"/images/ml4ds/image-20200924121002344.png","legacyPaths":["/blog/machine-learning-for-design-systems.html","/blog/machine-learning-for-design-systems/"],"sourceFile":"_posts/2020-09-24-Machine-Learning-for-Design-Systems.md","headings":[{"depth":2,"text":"Preliminar words","id":"preliminar-words"},{"depth":2,"text":"Background","id":"background"},{"depth":2,"text":"Setting-up a working Python environment","id":"setting-up-a-working-python-environment"},{"depth":3,"text":"direnv","id":"direnv"},{"depth":3,"text":"pyenv","id":"pyenv"},{"depth":2,"text":"Installation","id":"installation"},{"depth":3,"text":"Tensorflow2 installation","id":"tensorflow2-installation"},{"depth":3,"text":"Object Detection API installation","id":"object-detection-api-installation"},{"depth":2,"text":"Training UI dataset","id":"training-ui-dataset"},{"depth":3,"text":"STEP 1. Preparing the Workspace","id":"step-1-preparing-the-workspace"},{"depth":3,"text":"STEP 2. Gathering data","id":"step-2-gathering-data"},{"depth":3,"text":"STEP 3. Labeling data","id":"step-3-labeling-data"},{"depth":3,"text":"STEP 4. Generate the TF RECORDS","id":"step-4-generate-the-tf-records"},{"depth":3,"text":"STEP 5. Training configuration","id":"step-5-training-configuration"},{"depth":3,"text":"STEP6. Do Training!","id":"step6-do-training"},{"depth":4,"text":"Training model progress","id":"training-model-progress"},{"depth":3,"text":"STEP6. Exporting a Trained Model","id":"step6-exporting-a-trained-model"},{"depth":2,"text":"Let's Test!","id":"lets-test"},{"depth":2,"text":"Next steps","id":"next-steps"},{"depth":2,"text":"Reference","id":"reference"}]};

export default function MachineLearningForDesignSystemsContent() {
  return <>
      <blockquote>
        {"\n"}
        <p>
          {"The original of this document is "}
          <ContentLink href="https://medium.com/@judepark_6960/machine-learning-for-design-systems-315cd34b676f">here</ContentLink>
          {" (Korean)."}
        </p>
        {"\n"}
      </blockquote>
      {"\n"}
      <h2 id="preliminar-words">Preliminar words</h2>
      {"\n"}
      <p>
        {"This blog post is a re-work of the amazing tutorial from "}
        <ContentLink href="https://github.com/abdelrahman-gaber">
          <strong>Abdelrahman G. Abubakr</strong>
        </ContentLink>
        {" on how to create your own object detector with Object Detection API from Tensorflow 2. I am following the same steps as the tutorial, but I did a little differently to fit my development environment and design system research. I want to thank the author for the original content and everyone who wrote it for reducing my trial errors."}
      </p>
      {"\n"}
      <p>
        {"Also I have to say that I have developed this experiment in my research time working at "}
        <ContentLink href="https://linecorp.com">LINE corporation</ContentLink>
        {" where I perform as a platform designer of Design system."}
      </p>
      {"\n"}
      <h2 id="background">Background</h2>
      {"\n"}
      <p>
        <ContentImage src="/images/ml4ds/image-20200924120411503.png" alt="image-20200924120411503" />
      </p>
      {"\n"}
      <p>This idea started with my difficulty of creating a design system. The heart of the design system is to assemble design elements and create reusable libraries. But ironically, increasing resources in libraries (such as the Sketch symbol library), on the contrary, makes it increasingly difficult for designers to use in their design because the more complex the library, the more they have to learn, as well as the heavier the working environment.</p>
      {"\n"}
      <p>
        {"As a design system manager, this was a serious challenge. So I thought, "}
        <strong>What if Sketch Assistant could automatically detect which UI components are being used on the artboard, and recommend designers to use library symbols through the Assistant?</strong>
        {" A simple flow is shown below:"}
      </p>
      {"\n"}
      <p>
        <ContentImage src="/images/ml4ds/image-20200924121002344.png" alt="image-20200924121002344" />
      </p>
      {"\n"}
      <blockquote>
        {"\n"}
        <ol>
          {"\n"}
          <li>Machine learning the design system, (Custom dataset)</li>
          {"\n"}
          <li>Detecting the UI components in the artboard, (Object Detection API)</li>
          {"\n"}
          <li>Notify designers of UI elements that do not use the design system. (Sketch Assistant)</li>
          {"\n"}
        </ol>
        {"\n"}
      </blockquote>
      {"\n"}
      <p>
        {"After thinging the flow, I decided to start by creating a "}
        <strong>Custom dataset</strong>
        {" first."}
      </p>
      {"\n"}
      <hr />
      {"\n"}
      <h2 id="setting-up-a-working-python-environment">Setting-up a working Python environment</h2>
      {"\n"}
      <p>
        {"Firstly, I set up the Python virtual environment and installed Tenserflow according to "}
        <ContentLink href="https://github.com/abdelrahman-gaber/tf2-object-detection-api-tutorial">Tutorial</ContentLink>
        {" of "}
        <ContentLink href="https://github.com/abdelrahman-gaber">Abdelrahman G. Abubakr</ContentLink>
        .
      </p>
      {"\n"}
      <h3 id="direnv">direnv</h3>
      {"\n"}
      <p>
        {"First, I used a virtual environment with "}
        <ContentLink href="https://github.com/direnv/direnv/wiki/Python">direnv</ContentLink>
        {". It's also okay to use Anaconda or other virtual env tools, but I personally prefer to use direnv because it's comfortable to define the necessary settings for each directory via "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>.envrc</span>
            </span>
          </code>
        </span>
        .
      </p>
      {"\n"}
      <p>I can easily install it using Homebrew</p>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="bash" data-theme="github-dark-default">
          <code data-language="bash" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>brew</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" install"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" direnv"}</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <p>
        {"Next, add it to the configuration file corresponding to shell. "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>direnv</span>
            </span>
          </code>
        </span>
        {" officially supports BASH, ZSH, FISH, TCSH, Elvish, Check out the guide "}
        <ContentLink href="https://github.com/direnv/direnv/wiki/Python">here</ContentLink>
        , and add settings for your shell.
      </p>
      {"\n"}
      <p>After adding the settings, reboot the terminal and you can use direnv.</p>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="bash" data-theme="github-dark-default">
          <code data-language="bash" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span style={{
              color: "#8B949E"
            }}>{"## BASH -> Add below content to ~/.bashrc"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#79C0FF"
            }}>eval</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" \"$("}</span>
              <span style={{
              color: "#FFA657"
            }}>direnv</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" hook bash)\""}</span>
            </span>
            {"\n"}
            <span data-line="">{" "}</span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#8B949E"
            }}>{"## ZSH -> Add below content to ~/.zshrc"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#79C0FF"
            }}>eval</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" \"$("}</span>
              <span style={{
              color: "#FFA657"
            }}>direnv</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" hook zsh)\""}</span>
            </span>
            {"\n"}
            <span data-line="">{" "}</span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#8B949E"
            }}>{"## FISH -> Add the following to ~/.config/fish/config.fish"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#79C0FF"
            }}>eval</span>
              <span style={{
              color: "#E6EDF3"
            }}>{" (direnv "}</span>
              <span style={{
              color: "#A5D6FF"
            }}>hook</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" fish"}</span>
              <span style={{
              color: "#E6EDF3"
            }}>)</span>
            </span>
            {"\n"}
            <span data-line="">{" "}</span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#8B949E"
            }}>{"## TCSH -> Add the following to ~/.cshrc"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#79C0FF"
            }}>eval</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" `"}</span>
              <span style={{
              color: "#FFA657"
            }}>direnv</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" hook tcsh`"}</span>
            </span>
            {"\n"}
            <span data-line="">{" "}</span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#8B949E"
            }}>{"## Elvish -> execute the command below"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>$</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" direnv"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" hook"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" elvish"}</span>
              <span style={{
              color: "#FF7B72"
            }}>{" >"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" ~/.elvish/lib/direnv.elv"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#8B949E"
            }}>## Then add the following to ~/.elvish/rc.elv</span>
            </span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>use</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" direnv"}</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <p>
        {"Next, choose a folder you want to work at and create a directory named "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Tensorflow</span>
            </span>
          </code>
        </span>
        .
      </p>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="bash" data-theme="github-dark-default">
          <code data-language="bash" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>$</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" mkdir"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" TensorFlow"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>$</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" cd"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" TensorFlow"}</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <p>
        {"Temporarily creates a "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>.envrc</span>
            </span>
          </code>
        </span>
        {" file."}
      </p>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="bash" data-theme="github-dark-default">
          <code data-language="bash" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>$</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" touch"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" .envrc"}</span>
              <span style={{
              color: "#E6EDF3"
            }}>{"\t"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>direnv:</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" error"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" .envrc"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" is"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" blocked."}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" Run"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" `"}</span>
              <span style={{
              color: "#FFA657"
            }}>direnv</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" allow`"}</span>
              <span style={{
              color: "#FFA657"
            }}>{" to"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" approve"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" its"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" content."}</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <p>
        {"When a "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>.envrc</span>
            </span>
          </code>
        </span>
        {" file is created, direnv will detect it and print a warning message. The reason is to prevent unwanted shell script execution from happening. Therefore, if we want to add or change the "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>.envrc</span>
            </span>
          </code>
        </span>
        {" file, we must explicitly allow it."}
      </p>
      {"\n"}
      <p>
        {"Execute the "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>allow</span>
            </span>
          </code>
        </span>
        {" command to allow the use of the "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>.envrc</span>
            </span>
          </code>
        </span>
        {" file in the current directory."}
      </p>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="bash" data-theme="github-dark-default">
          <code data-language="bash" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>$</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" direnv"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" allow"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>direnv:</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" loading"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" .envrc"}</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <h3 id="pyenv">pyenv</h3>
      {"\n"}
      <p>Next, we will download the Python version to use using pyenv. Since I manage the virtual environment in direnv, I will only use pyenv for version control of Python.</p>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="bash" data-theme="github-dark-default">
          <code data-language="bash" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>brew</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" install"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" pyenv"}</span>
              <span style={{
              color: "#8B949E"
            }}>{" ## install pyenv"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>pyenv</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" install"}</span>
              <span style={{
              color: "#79C0FF"
            }}>{" --list"}</span>
              <span style={{
              color: "#8B949E"
            }}>{" ## search available python versions"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>pyenv</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" install"}</span>
              <span style={{
              color: "#79C0FF"
            }}>{" 3.7.0"}</span>
              <span style={{
              color: "#E6EDF3"
            }}>{" "}</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <p>
        {"After installing Python, specify the environment in the "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>.envrc</span>
            </span>
          </code>
        </span>
        , and restart the terminal to set up the virtual environment in that directory.
      </p>
      {"\n"}
      <p>
        {"A more detailed installation guide can be found at "}
        <ContentLink href="https://github.com/direnv/direnv/wiki/Python">
          <strong>direnv wiki</strong>
        </ContentLink>
        .
      </p>
      {"\n"}
      <p>
        <ContentImage src="/images/ml4ds/Screen%20Shot%202020-09-24%20at%2012.45.12%20PM.png" alt="Screen Shot 2020-09-24 at 12.45.12 PM" />
      </p>
      {"\n"}
      <hr />
      {"\n"}
      <h2 id="installation">Installation</h2>
      {"\n"}
      <h3 id="tensorflow2-installation">Tensorflow2 installation</h3>
      {"\n"}
      <p>Refer to the Tensorflow official site and install Tenserflow in my Python virtual environment in the following way. (As of September 2020)</p>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="bash" data-theme="github-dark-default">
          <code data-language="bash" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span style={{
              color: "#8B949E"
            }}>## Install the latest version of Tensorflow 2</span>
            </span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>pip</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" install"}</span>
              <span style={{
              color: "#79C0FF"
            }}>{" --upgrade"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" tensorflow"}</span>
            </span>
            {"\n"}
            <span data-line="">{" "}</span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#8B949E"
            }}>## Installation validation</span>
            </span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>python</span>
              <span style={{
              color: "#79C0FF"
            }}>{" -c"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" \"import tensorflow as tf;print(tf.reduce_sum(tf.random.normal([1000, 1000])))\""}</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <p>
        {"For reference, when I run the installation verification code (tf.reduce) on my MacBook Pro, the following message is displayed.\nFortunately, the forums say we can ignore this now. "}
        <ContentLink href="https://github.com/tensorflow/tensorflow/issues/8037">https://github.com/tensorflow/tensorflow/issues/8037</ContentLink>
      </p>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="plaintext" data-theme="github-dark-default">
          <code data-language="plaintext" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span>I tensorflow/core/platform/cpu_feature_guard.cc:142] This TensorFlow binary is optimized with oneAPI Deep Neural Network Library (oneDNN)to use the following CPU instructions in performance-critical operations:  AVX2 FMA</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <h3 id="object-detection-api-installation">Object Detection API installation</h3>
      {"\n"}
      <p>Now open a terminal, go to the TensorFlow directory and clone the Tensorflow model repository.</p>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="bash" data-theme="github-dark-default">
          <code data-language="bash" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span style={{
              color: "#79C0FF"
            }}>cd</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" TensorFlow"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>git</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" clone"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" https://github.com/tensorflow/models"}</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <p>You should now have a single folder named models under your TensorFlow folder, which contains another 4 folders as such:</p>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="plaintext" data-theme="github-dark-default">
          <code data-language="plaintext" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span>TensorFlow/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>└─ models/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>{"   ├─ community/"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>{"   ├─ official/"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>{"   ├─ orbit/"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>{"   ├─ research/"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>{"   └── ..."}</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <p>
        {"Since Object Detection API use "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>.proto</span>
            </span>
          </code>
        </span>
        {" files and these files need to be compiled into "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>.py</span>
            </span>
          </code>
        </span>
        {" files in order for the Object Detection API to work properly. So we should install "}
        <ContentLink href="https://grpc.io/docs/protoc-installation/#install-using-a-package-manager">protobuf</ContentLink>
        {" for compiling these files."}
      </p>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="bash" data-theme="github-dark-default">
          <code data-language="bash" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span style={{
              color: "#8B949E"
            }}>{"# Install Compiler (version >= 3.0)"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>brew</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" install"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" protobuf"}</span>
              <span style={{
              color: "#E6EDF3"
            }}>{" "}</span>
            </span>
            {"\n"}
            <span data-line="">{" "}</span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#8B949E"
            }}># Go to models folder</span>
            </span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#79C0FF"
            }}>cd</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" models/research"}</span>
            </span>
            {"\n"}
            <span data-line="">{" "}</span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#8B949E"
            }}># compile protos:</span>
            </span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>protoc</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" object_detection/protos/"}</span>
              <span style={{
              color: "#79C0FF"
            }}>*</span>
              <span style={{
              color: "#A5D6FF"
            }}>.proto</span>
              <span style={{
              color: "#79C0FF"
            }}>{" --python_out=."}</span>
            </span>
            {"\n"}
            <span data-line="">{" "}</span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#8B949E"
            }}># Install TensorFlow Object Detection API as a python package:</span>
            </span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>cp</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" object_detection/packages/tf2/setup.py"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" ."}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>python</span>
              <span style={{
              color: "#79C0FF"
            }}>{" -m"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" pip"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" install"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" ."}</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <p>
        {"After that, "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>cd</span>
            </span>
          </code>
        </span>
        {" into "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>TensorFlow/models/research/</span>
            </span>
          </code>
        </span>
        {" directory and run the following command:\nIf OK comes out, the test is successful :)"}
      </p>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="bash" data-theme="github-dark-default">
          <code data-language="bash" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span style={{
              color: "#8B949E"
            }}># From within TensorFlow/models/research/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>python</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" object_detection/builders/model_builder_tf2_test.py"}</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <p>
        <ContentImage src="/images/ml4ds/Screen%20Shot%202020-09-24%20at%201.37.09%20PM.png" alt="Screen Shot 2020-09-24 at 1.37.09 PM" />
      </p>
      {"\n"}
      <p>
        {"If you want to see the test results in front of your eyes, use the test script from "}
        <ContentLink href="https://github.com/abdelrahman-gaber/tf2-object-detection-api-tutorial">Tutorial</ContentLink>
        {" by "}
        <ContentLink href="https://github.com/abdelrahman-gaber">Abdelrahman G. Abubakr</ContentLink>
        {". Choose one of the pre-trained models provided in "}
        <ContentLink href="https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/tf2_detection_zoo.md">tf2 detection model zoo</ContentLink>
        {" and put it in the test script, you can see the test result as follows:"}
      </p>
      {"\n"}
      <p>
        {"the pretrained EfficientDet D0 model: "}
        <ContentLink href="https://github.com/abdelrahman-gaber/tf2-object-detection-api-tutorial#inference-with-pre-trained-models">See more</ContentLink>
      </p>
      {"\n"}
      <p>
        <ContentImage src="https://github.com/abdelrahman-gaber/tf2-object-detection-api-tutorial/raw/master/data/samples/output/1.jpg" alt="Machine Learning for Design Systems — Object Detection API installation" />
      </p>
      {"\n"}
      <hr />
      {"\n"}
      <h2 id="training-ui-dataset">Training UI dataset</h2>
      {"\n"}
      <h3 id="step-1-preparing-the-workspace">STEP 1. Preparing the Workspace</h3>
      {"\n"}
      <p>
        {"Now create a new folder under "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>TensorFlow</span>
            </span>
          </code>
        </span>
        {" and call it "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>workspace</span>
            </span>
          </code>
        </span>
        {". It is within the "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>workspace</span>
            </span>
          </code>
        </span>
        {" that we will store all our training set-ups. Now let’s go under workspace and create another folder named "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>training_demo</span>
            </span>
          </code>
        </span>
        . Now our directory structure should be as so:
      </p>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="plaintext" data-theme="github-dark-default">
          <code data-language="plaintext" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span>TensorFlow/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>├─ models/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>│  ├─ community/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>│  ├─ official/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>│  ├─ orbit/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>│  ├─ research/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>│  └─ ...</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>└─ workspace/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>{"   └─ training_demo/"}</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <p>
        {"The "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>training_demo</span>
            </span>
          </code>
        </span>
        {" folder shall be our training folder, which will contain all files related to our model training. It is advisable to create a separate training folder each time we wish to train on a different dataset. The typical structure for training folders is shown below."}
      </p>
      {"\n"}
      <p>
        <em>
          {"Source: "}
          <ContentLink href="https://tensorflow-object-detection-api-tutorial.readthedocs.io">https://tensorflow-object-detection-api-tutorial.readthedocs.io</ContentLink>
        </em>
      </p>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="plaintext" data-theme="github-dark-default">
          <code data-language="plaintext" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span>training_demo/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>├─ annotations/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>├─ exported-models/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>├─ images/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>│  ├─ test/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>│  └─ train/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>├─ models/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>├─ pre-trained-models/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>└─ README.md</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <hr />
      {"\n"}
      <h3 id="step-2-gathering-data">STEP 2. Gathering data</h3>
      {"\n"}
      <p>
        {"For our purpose we are going to use a bunch of images regarding with "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Button</span>
            </span>
          </code>
        </span>
        {" UI component. To do that as fast as possible we are going not only to extract button images from our symbol library but also to scrap google images with a python script to automate the process."}
      </p>
      {"\n"}
      <p>
        {"Scripts can be downloaded from:\n"}
        <ContentLink href="https://github.com/hardikvasa/google-images-download">https://github.com/hardikvasa/google-images-download</ContentLink>
      </p>
      {"\n"}
      <p>{"and, for example, place the downloaded files in projects folder named as google-images-download.\nThen just navigate to the folder where the python script is and execute:"}</p>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="plaintext" data-theme="github-dark-default">
          <code data-language="plaintext" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span>{" googleimagesdownload --keywords \"button ui design\" --f jpg --size medium --output_directory ./button"}</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <p>
        {"Next, move about 90% of images into "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>/images/train</span>
            </span>
          </code>
        </span>
        {" directory and the other 10% into "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>/images/test</span>
            </span>
          </code>
        </span>
        {" directory."}
      </p>
      {"\n"}
      <Gallery images={[{
      "src": "/images/ml4ds/Screen%20Shot%202020-09-24%20at%201.49.42%20PM.png",
      "width": 1480,
      "height": 1042,
      "alt": "Machine Learning for Design Systems — project image 1"
    }, {
      "src": "/images/ml4ds/Screen%20Shot%202020-09-24%20at%201.51.37%20PM.png",
      "width": 1766,
      "height": 1376,
      "alt": "Machine Learning for Design Systems — project image 2"
    }]} columns={2} fullWidth={true} />
      {"\n"}
      <hr />
      {"\n"}
      <h3 id="step-3-labeling-data">STEP 3. Labeling data</h3>
      {"\n"}
      <p>
        {"In order to label our data, we need some kind of labeling software. In this particular case we are going to use "}
        <ContentLink href="https://github.com/tzutalin/labelImg">labelimg</ContentLink>
        .
      </p>
      {"\n"}
      <p>According to the rules of my design system, I created a label by classifying it into 4 categories: contained button, outlined button, icon button, and ghost button. It seems easy and repetitive task, but it's super time consuming. In my case, I used labelimg to label about 200 images, which took over an hour.</p>
      {"\n"}
      <p>
        <ContentImage src="/images/ml4ds/Screen%20Shot%202020-09-24%20at%202.03.51%20PM.png" alt="Screen Shot 2020-09-24 at 2.03.51 PM" />
      </p>
      {"\n"}
      <p>
        {"Next, we need to create a label map, which namely maps each of the used labels to an integer values. We will put it in the "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>training_demo/annotations</span>
            </span>
          </code>
        </span>
        {" folder with the name "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>labelmap.pbtxt</span>
            </span>
          </code>
        </span>
        {". Below we show an example "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>label_map.pbtxt</span>
            </span>
          </code>
        </span>
        , assuming that our dataset containes 4 labels:
      </p>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="plaintext" data-theme="github-dark-default">
          <code data-language="plaintext" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span>{"item {"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>{"  id: 1"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>{"  name: 'contained button'"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>{"}"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>{"item {"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>{"  id: 2"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>{"  name: 'outlined button'"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>{"}"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>{"item {"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>{"  id: 3"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>{"  name: 'icon button'"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>{"}"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>{"item {"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>{"  id: 4"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>{"  name: 'ghost button'"}</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>{"}"}</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <hr />
      {"\n"}
      <h3 id="step-4-generate-the-tf-records">STEP 4. Generate the TF RECORDS</h3>
      {"\n"}
      <p>Now that we have generated our annotations and split our dataset into the desired training and testing subsets, it is time to convert our annotations into the so called TFRecord format.</p>
      {"\n"}
      <p>
        {"Thankfully, many pioneers have already created scripts to convert xml to record format. All we need to do in this phase is just "}
        <ContentLink href="https://tensorflow-object-detection-api-tutorial.readthedocs.io/en/latest/_downloads/da4babe668a8afb093cc7776d7e630f3/generate_tfrecord.py">download their Python script</ContentLink>
        {", save it inside "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>TensorFlow/scripts/preprocessing</span>
            </span>
          </code>
        </span>
        , and execute commends below:
      </p>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="bash" data-theme="github-dark-default">
          <code data-language="bash" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span style={{
              color: "#8B949E"
            }}>## cd TensorFlow/scripts/preprocessing</span>
            </span>
            {"\n"}
            <span data-line="">{" "}</span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#8B949E"
            }}># Create train data:</span>
            </span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>python</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" generate_tfrecord.py"}</span>
              <span style={{
              color: "#79C0FF"
            }}>{" -x"}</span>
              <span style={{
              color: "#E6EDF3"
            }}>{" [PATH_TO_IMAGES_FOLDER]/train -l [PATH_TO_ANNOTATIONS_FOLDER]/label_map.pbtxt -o [PATH_TO_ANNOTATIONS_FOLDER]/train.record"}</span>
            </span>
            {"\n"}
            <span data-line="">{" "}</span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#8B949E"
            }}># Create test data:</span>
            </span>
            {"\n"}
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>python</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" generate_tfrecord.py"}</span>
              <span style={{
              color: "#79C0FF"
            }}>{" -x"}</span>
              <span style={{
              color: "#E6EDF3"
            }}>{" [PATH_TO_IMAGES_FOLDER]/test -l [PATH_TO_ANNOTATIONS_FOLDER]/label_map.pbtxt -o [PATH_TO_ANNOTATIONS_FOLDER]/test.record"}</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <p>
        <em>
          {"Source: "}
          <ContentLink href="https://tensorflow-object-detection-api-tutorial.readthedocs.io">https://tensorflow-object-detection-api-tutorial.readthedocs.io</ContentLink>
        </em>
      </p>
      {"\n"}
      <p>
        {"Once the above is done, there should be 2 new files under the "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>training_demo/annotations</span>
            </span>
          </code>
        </span>
        {" folder, named "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>test.record</span>
            </span>
          </code>
        </span>
        {" and "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>train.record</span>
            </span>
          </code>
        </span>
        , respectively.
      </p>
      {"\n"}
      <hr />
      {"\n"}
      <h3 id="step-5-training-configuration">STEP 5. Training configuration</h3>
      {"\n"}
      <p>
        {"For the purposes of this tutorial we will not be creating a training job from scratch, but rather we will reuse one of the pre-trained models provided by TensorFlow. If you would like to train an entirely new model, you can have a look at "}
        <ContentLink href="https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/configuring_jobs.md">TensorFlow’s tutorial</ContentLink>
        .
      </p>
      {"\n"}
      <p>
        {"The model we shall be using in our examples is the "}
        <ContentLink href="http://download.tensorflow.org/models/object_detection/tf2/20200711/efficientdet_d0_coco17_tpu-32.tar.gz">ssd_mobilenet_v2_320x320_coco17_tpu-8</ContentLink>
        {" model, since it provides a relatively good trade-off between performance and speed. However, there exist a number of other models you can use, all of which are listed in"}
        <ContentLink href="https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/tf2_detection_zoo.md">{" TensorFlow 2 Detection Model Zoo"}</ContentLink>
        .
      </p>
      {"\n"}
      <p>
        {"Clicking on the name of your model should initiate a download for a *.tar.gz file. and extract its contents inside the folder "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>training_demo/pre-trained-models</span>
            </span>
          </code>
        </span>
        {". our "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>training_demo</span>
            </span>
          </code>
        </span>
        {" directory should now look as follows:"}
      </p>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="plaintext" data-theme="github-dark-default">
          <code data-language="plaintext" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span>training_demo/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>├─ ...</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>├─ pre-trained-models/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>│  └─ ssd_mobilenet_v2_320x320_coco17_tpu-8/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>│     ├─ checkpoint/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>│     ├─ saved_model/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>│     └─ pipeline.config</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>└─ README.md</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <p>
        {"Now that we have downloaded and extracted our pre-trained model, let’s create a directory for our training job. Under the "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>training_demo/models</span>
            </span>
          </code>
        </span>
        {" create a new directory named "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>my_ssd_mobilenet_v2_320x320_coco17_tpu-8</span>
            </span>
          </code>
        </span>
        {" and copy the "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>pipeline.config</span>
            </span>
          </code>
        </span>
        {" file inside the newly created directory. Our training_demo/models directory should now look like this:"}
      </p>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="plaintext" data-theme="github-dark-default">
          <code data-language="plaintext" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span>training_demo/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>├─ ...</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>├─ models/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>│  └─ my_ssd_mobilenet_v2_320x320_coco17_tpu-8/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>│     └─ pipeline.config</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>└─ ...</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <p>Now, let’s have a look at the changes that we shall need to apply to the pipeline.config file. Please refer to the two links below for more detailed settings.</p>
      {"\n"}
      <ul>
        {"\n"}
        <li>
          <ContentLink href="https://tensorflow-object-detection-api-tutorial.readthedocs.io/en/latest/training.html#preparing-the-workspace">Primary reference</ContentLink>
        </li>
        {"\n"}
        <li>
          <ContentLink href="https://github.com/abdelrahman-gaber/tf2-object-detection-api-tutorial#training-object-detection-model-with-your-custom-dataset">Secondary reference</ContentLink>
        </li>
        {"\n"}
      </ul>
      {"\n"}
      <hr />
      {"\n"}
      <h3 id="step6-do-training">STEP6. Do Training!</h3>
      {"\n"}
      <p>
        {"Before we begin training our model, let’s go and copy the "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>TensorFlow/models/research/object_detection/model_main_tf2.py</span>
            </span>
          </code>
        </span>
        {" script and paste it straight into our "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>training_demo</span>
            </span>
          </code>
        </span>
        {" folder. We will need this script in order to train our model."}
      </p>
      {"\n"}
      <p>
        {"Now, to initiate our new training job, open a new Terminal, go to the "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>training_demo</span>
            </span>
          </code>
        </span>
        {" folder and run the following command:"}
      </p>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="bash" data-theme="github-dark-default">
          <code data-language="bash" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>python</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" model_main_tf2.py"}</span>
              <span style={{
              color: "#79C0FF"
            }}>{" --model_dir=models/my_ssd_mobilenet_v2_320x320_coco17_tpu-8"}</span>
              <span style={{
              color: "#79C0FF"
            }}>{" --pipeline_config_path=models/my_ssd_mobilenet_v2_320x320_coco17_tpu-8/pipeline.config"}</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <p>{"If everything was setup correctly the training should begin shortly.\nThen in the terminal you will see the log as below. Not surprisingly, time varies widely depending on the computer's performance and the size of the pre-trained model. For my Macbook Pro 15 (2018-mid), it took about 2.5 hours to train 3000 steps. Please refer to it when you configure training."}</p>
      {"\n"}
      <p>
        <ContentImage src="/images/ml4ds/Screen%20Shot%202020-09-23%20at%206.45.53%20PM.png" alt="Screen Shot 2020-09-23 at 6.45.53 PM" />
      </p>
      {"\n"}
      <h4 id="training-model-progress">Training model progress</h4>
      {"\n"}
      <p>
        {"the current loss gets logged to Tensorboard. We can open "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Tensorboard</span>
            </span>
          </code>
        </span>
        {" by opening a second command line, navigating to "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Tensorflow</span>
            </span>
          </code>
        </span>
        {" folder and typing:"}
      </p>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="bash" data-theme="github-dark-default">
          <code data-language="bash" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>tensorboard</span>
              <span style={{
              color: "#79C0FF"
            }}>{" --logdir=models/my_ssd_mobilenet_v2_320x320_coco17_tpu-8"}</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <p>Then a web page will be opened autometically at localhost:6006</p>
      {"\n"}
      <p>
        <del>In the case of me, who is not familiar with deep learning, there is a problem of **"I don't know what number it is." Anyway, it was a useful tool to see my progress.</del>
      </p>
      {"\n"}
      <p>
        <ContentImage src="/images/ml4ds/Screen%20Shot%202020-09-23%20at%209.51.58%20PM.png" alt="Screen Shot 2020-09-23 at 9.51.58 PM" />
      </p>
      {"\n"}
      <hr />
      {"\n"}
      <h3 id="step6-exporting-a-trained-model">STEP6. Exporting a Trained Model</h3>
      {"\n"}
      <p>Once your training job is complete, you need to extract the newly trained inference graph, which will be later used to perform the object detection. This can be done as follows:</p>
      {"\n"}
      <ul>
        {"\n"}
        <li>
          {"Copy the "}
          <span data-rehype-pretty-code-figure="">
            <code data-language="plaintext" data-theme="github-dark-default">
              <span data-line="">
                <span>TensorFlow/models/research/object_detection/exporter_main_v2.py</span>
              </span>
            </code>
          </span>
          {" script and paste it straight into your "}
          <span data-rehype-pretty-code-figure="">
            <code data-language="plaintext" data-theme="github-dark-default">
              <span data-line="">
                <span>training_demo</span>
              </span>
            </code>
          </span>
          {" folder."}
        </li>
        {"\n"}
        <li>
          {"Now, open a Terminal, go to "}
          <span data-rehype-pretty-code-figure="">
            <code data-language="plaintext" data-theme="github-dark-default">
              <span data-line="">
                <span>training_demo</span>
              </span>
            </code>
          </span>
          {" folder, and execute the following command:"}
        </li>
        {"\n"}
      </ul>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="plaintext" data-theme="github-dark-default">
          <code data-language="plaintext" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span>python .\exporter_main_v2.py --input_type image_tensor --pipeline_config_path .\models\my_efficientdet_d1\pipeline.config --trained_checkpoint_dir .\models\my_efficientdet_d1\ --output_directory .\exported-models\my_model</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <p>
        {"After the above process has completed, you should find a new folder "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>my_model</span>
            </span>
          </code>
        </span>
        {" under the "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>training_demo/exported-models</span>
            </span>
          </code>
        </span>
        , that has the following structure:
      </p>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="plaintext" data-theme="github-dark-default">
          <code data-language="plaintext" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span>training_demo/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>├─ ...</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>├─ exported-models/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>│  └─ my_model/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>│     ├─ checkpoint/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>│     ├─ saved_model/</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>│     └─ pipeline.config</span>
            </span>
            {"\n"}
            <span data-line="">
              <span>└─ ...</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <h2 id="lets-test">Let's Test!</h2>
      {"\n"}
      <p>The button that I use most frequently in the era of COVID-19 in here South Korea is the QR check-in function of NAVER/KAKAOTALK app. I video-recorded these screen-flow from my iPhone and tested whether our new machine learning model can find the button well. The test tool was used by copying the Abdelrahman G. Abubakr's test script that I used above</p>
      {"\n"}
      <blockquote>
        {"\n"}
        <p>Expect.. expect.. expect..</p>
        {"\n"}
      </blockquote>
      {"\n"}
      <ContentImage src="/images/ml4ds/ezgif.com-video-to-gif.gif" alt="ezgif.com-video-to-gif" style={{
      "zoom": "50%"
    }} />
      {"\n"}
      <p>BOOOOM! Of course, it's not perfect, such as finding only 1 icon button... But Contained buttons like'OK' and'Cancel' are definitely finding! 🍺</p>
      {"\n"}
      <hr />
      {"\n"}
      <h2 id="next-steps">Next steps</h2>
      {"\n"}
      <p>The next step is to convert the newly created model to tensorflow js and make it available to Sketch assistant based on Node js. But this part requires another study, so I will take a break before proceeding.</p>
      {"\n"}
      <p>
        {"In addition, I realized that the process of creating pre-trained model with custom dataset is a huge amount for individuals not to do alone.\nInstead, I decided to "}
        <strong>suggest design communities making a pre-trained model together</strong>
        {" via open source."}
      </p>
      {"\n"}
      <p>
        {"Looking at the examples in "}
        <ContentLink href="https://www.visualdata.io/discovery">visualdata.io</ContentLink>
        {" or ["}
        <ContentLink href="https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/tf2_detection_zoo.md">tf2 detection model zoo</ContentLink>
        {", there are many datasets that can be used in machine learning by numerous contributors, but unfortunately, there seems to be "}
        <strong>no dataset that detects UI objects yet</strong>
        .
      </p>
      {"\n"}
      <p>{"Starting this blog post, If there is a chance, I will share my experiences with the communities in Korea and try to move on next together.\nIf you are also interested in this project, thank you!! Please find me in the Facebook group below."}</p>
      {"\n"}
      <ul>
        {"\n"}
        <li>
          <ContentLink href="https://www.facebook.com/groups/540872086300813">Design spectrum</ContentLink>
        </li>
        {"\n"}
        <li>
          <ContentLink href="https://www.facebook.com/groups/sketchappkorea">Sketch app Korea</ContentLink>
        </li>
        {"\n"}
      </ul>
      {"\n"}
      <h2 id="reference">Reference</h2>
      {"\n"}
      <ul>
        {"\n"}
        <li>
          <ContentLink href="https://www.tensorflow.org/js?hl=ko">https://www.tensorflow.org/js?hl=ko</ContentLink>
        </li>
        {"\n"}
        <li>
          <ContentLink href="https://github.com/5taku/custom_object_detection">https://github.com/5taku/custom_object_detection</ContentLink>
        </li>
        {"\n"}
        <li>
          <ContentLink href="https://tensorflow-object-detection-api-tutorial.readthedocs.io/en/latest/index.html">https://tensorflow-object-detection-api-tutorial.readthedocs.io/en/latest/index.html</ContentLink>
        </li>
        {"\n"}
        <li>
          <ContentLink href="https://github.com/abdelrahman-gaber/tf2-object-detection-api-tutorial#training-object-detection-model-with-your-custom-dataset">https://github.com/abdelrahman-gaber/tf2-object-detection-api-tutorial#training-object-detection-model-with-your-custom-dataset</ContentLink>
        </li>
        {"\n"}
      </ul>
    </>;
}
