pipeline {
    agent {
        node {
            label 'docker-agent-alpine'
        }
    }
    triggers {
        pollSCM '*/5 * * * *'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Compiling...'
                sh '''
                cd DalSocial/backend/dalsocial
                mvn -B -DskipTests clean package
                '''
            }
        }
        stage('Test') {
            steps {
                echo 'Running Unit Tests...'
                sh '''
                cd DalSocial/backend/dalsocial
                mvn test
                '''
            }
            post {
                always {
                    junit '**/target/surefire-reports/*.xml'
                }
            }
        }
        stage('Deploy') {
            steps {
                echo "Deploying..."
            }
        }
    }
}