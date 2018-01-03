# Totem
Modular prototype framework for the web.

## Installation
First, install Yeoman and generator-totem using npm (we assume you have pre-installed node.js).

Then install your new project:

```bash
yo totem:install
```

## Setup your first module
Setting up a module, page or template file is very easy by using the Yeoman Generator  (generator-totem). You can easily create one within the Totem structure by running the following command:

```bash
yo totem
```
## Totem file structure
The Totem structure has been split up in 4 sections (folders):
1. main - Global assets & shared libraries should be defined here.
2. modules - Core styling, layout & logic for each module should be defined here.
3. group (pages) - Specific page overrides can be defined here.
4. templates - Each template comes with a stylesheet that should import all the necessary modules we wan't to use. The pre-defined default-template imports every stylesheet that has been created within your project.


## Main
The `main` folder contains all core files that are used by Totem; i.e. mixins, function and variables.
You can adjust the settings within this section. for typography, responsive breakpoints & colors.

## Modules
Modules are small parts that can work together with each other. A module is a small part of your application, it's recommended to keep your modules small.

It's recommended to define additional overrides within the **page** section.

## Groups & pages
A group marks down a section of your application. You should group pages that displays the same entity within the same directory. A group is splitted into folders to keep your project clean. Each page has the option to pass additional styling within.

## Templates
A template should only define the base layout for your pages. Your application can contain multiple templates. Import logic will be mostly done within this section. When using the default template you will load all styles on a global level.

## Extends
The Extends layer can be used for extending external modules within your Project. Modules should have the correct import paths to this layer (i.e. extends/**).

The Extends layer can only contain non output files (no styling) and should only be used if your installed modules supports imports within this layer.