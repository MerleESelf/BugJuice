

# Bug Juice 

Bug Juice is a task managment application created by me, Merle Self: FullStack Developer, that seeks to aid in workflow productivity for other developers, like myself. In choosing this project, I wanted to continue to grow my understanding of development within the framework of Next.js. I also wanted exspose myself to newer technoligies and libraries used for modern web development such as Formik and Yup for form creation, and validation, respectively; Utilizing Supabase for my hosted database, and leveraging SupabaseAuth to set up third party user authentication via GitHub; I also sought to create a simplistic yet appleaing UI/UX utilizing Daisy UI components; Tailwindcss class based styling was also leveraged to create a responsive design, enabling the user to use the app both on desktop, and in their browser on moble. Please [click here](https://bug-juice.vercel.app) to visit the deployed application. 

## Getting Started 

1. [Clone the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) to your local machine.
2. Use your terminal to navigate into the new BugJuice folder, and open the code base in your text editor. 
3. Install project dependencies by running <code>npm i</code>.
4. Start the development server by running <code>npm run dev</code>, and navigate to https://localhost:3000 to interact with the front end. 

## Using Bug Juice 

After naviagting to Bug Juice either in development, or on the deployed site you will be greeted by the landing page: 

<img width="1262" alt="Screen Shot 2023-01-12 at 7 56 33 PM" src="https://user-images.githubusercontent.com/90343601/212215402-e88f0578-0f15-4a3a-ac08-ac6c254f9b59.png">

To enter the site, click the "SIGN IN WITH GITHUB" button as displayed above. You will then be redirected to GitHub, where you will be asked if you will allow GitHub to be used to authenticate you as a user of Bug Juice. Once this is done you will be taken to your main page. 

<img width="1920" alt="Screen Shot 2023-01-12 at 8 56 20 PM" src="https://user-images.githubusercontent.com/90343601/212219882-b1cb2c5f-e6c0-45ba-a5ef-20cfa2708131.png">


From this veiw users can add new tasks, edit as well as delete their exsisting tasks. Tasks are displayed in columns that corespond to their state in the users workflow: Future tasks, tasks that need need attention, tasks in progress, and tasks that the user has completed. Each category for tasks will list how many tasks are in that section. Tasks can be dragged by the user to quickly to move them from one section of their work flow to another. Users can also quickly asses which tasks in each catagory will take precident over the others with each task's priority rating and date of expected completion displayed to the user.

## Future Goals 

I hope to continue scaling Bug Juice to include views for multiple task lists based on different projects that the user can have. I would love to enable push notifications and alerts for tasks that have an upcoming due date. Expertimenting with GitHub intergration that would enable users to leverage Bug Juice as a project board is something that I'm also highly interested in tackling. I very much enjoyed tackling this project, and would love to see where scaling this application takes me. 
 

## Tech Stack 

- Nextjs 
- Vercel
- Daisy UI 
- Tailwindcss 
- Formik 
- Yup 
- DND kit 
- Supabase 
- Sequlize 
- Supabase Auth 







