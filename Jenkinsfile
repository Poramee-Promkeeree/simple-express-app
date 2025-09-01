pipeline {
  agent any

  tools {
    nodejs 'Node 18'
    sonarQubeScanner 'SonarQube Scanner'
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main',
            url: 'https://github.com/Poramee-Promkeeree/simple-express-app.git'
      }
    }

    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('SonarQube Scan') {
      steps {
        withSonarQubeEnv('SonarQube') {
          withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
            sh '''
              sonar-scanner \
                -Dsonar.projectKey=simple-express-app \
                -Dsonar.sources=. \
                -Dsonar.token=$SONAR_TOKEN
            '''
          }
        }
      }
    }

    stage('Quality Gate') {
      steps {
        timeout(time: 2, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }
  }
}
