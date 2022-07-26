# Thrivealternative

API deployed url is https://thrivealternative.herokuapp.com/graphql

### Architecture Diagram

![Diagram](https://i.ibb.co/8PcPpqp/thrive-diagram.png)

source: https://ibb.co/HGdGs6s

### UML Diagram

![UML Diagram](https://i.ibb.co/nC6HBxL/thrive-uml-diagram.png)

source: https://ibb.co/hfLPc3m


# Public Routes

#### Mutation

- **Login** 
- **Register** 

# Protected Routes

#### Mutation 

- **CreateBlog** - create a blog for current user/author
- **AddComment** - add a comment of a blog.
- **GetBlogs** - get all blogs of current logged in user
- **DeleteComment** - delete a comment
- **DeleteBlog** - delete a blog together with the comments

## How to run the project
1. `npm install --global yarn`
2. `yarn install`
3. `yarn dev`
