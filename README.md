## Big FT [![Test Coverage](https://codeclimate.com/github/ftlabs/big-ft/badges/coverage.svg)](https://codeclimate.com/github/ftlabs/big-ft/coverage) [![Code Climate](https://codeclimate.com/github/ftlabs/big-ft/badges/gpa.svg)](https://codeclimate.com/github/ftlabs/big-ft)

### Development

#### Prerequisites
- [Docker](https://www.docker.com/docker-toolbox) -- _Used for running the application_
- [Heroku Toolbelt](https://toolbelt.heroku.com/) -- _Used for interacting with the production/testing instances_
- Heroku Docker plugin -- `heroku plugins:install heroku-docker` -- _Used for deploying the application_

Docker's underlying containerization technology only works on Linux. If running OS X or Windows, you will need a Linux virtual machine to host your Docker containers. If you installed the Docker-Toolbox, you will most likely already have a small Linux virtual machine made for you which is named `default`. 

- Check if you already have a Linux virtual machine set-up for Docker, it may be named `default` -- `docker-machine ls`

If you don't have a Linux virtual machine set-up for Docker:
	- Create a virtual machine -- `docker-machine create --driver virtualbox default` (change the driver value if using vmware or a different hypervisor)

- Check that your machine is running by checking if the `STATE` column outputs `Running` -- `docker-machine ls`

If machine is not running:
	- Start the machine -- `docker-machine start default`

The Docker CLI uses environment variables to figure out what IP address and port to communicate on.
- This command will export the needed environment variables for you -- `eval "$(docker-machine env default)"`

#### Setting up development environment
- Clone the repository -- `git clone git@github.com:ftlabs/big-ft.git`
- Change in repository directory -- `cd big-ft`
- Build a Docker image -- `docker build .`
- Spin up the web process in a container -- `docker-compose up web`
- Open the application in your browser of choice -- `open "http://$(docker-machine ip default):8080"`

### Deploying
As we are using Heroku Docker for development, we can no longer deploy using `git`.

- Deploy a new release using -- `heroku docker:release --app {APP_NAME}`

### Updating Code-Climate
- Install Code-Climate's Test Reporter -- `npm install -g codeclimate-test-reporter`
- Run the tests for the project -- `gulp test`
- Upload the coverage file to Code-Climate -- `CODECLIMATE_REPO_TOKEN=[your token] codeclimate-test-reporter < coverage/lcov.info`
