pipeline {
  agent any

  tools {
    nodejs 'Node 18'
  }

  environment {
    SONARQUBE_SERVER_NAME = 'SonarQube'
  }

  stages {
    stage('Checkout') {
      steps {
        echo "Source code checked out from SCM"
      }
    }

    stage('Install') {
      steps {
        sh '''
          if [ -f package-lock.json ]; then
            npm ci
          else
            npm install
          fi
        '''
      }
    }

    stage('Test') {
      steps {
        sh '''
          if npm run | grep -qE "^\\s*test"; then
            npm test --silent || true
          else
            echo "No test script defined, skipping tests."
          fi
        '''
      }
    }

    stage('SonarQube Scan') {
      steps {
        withSonarQubeEnv("${SONARQUBE_SERVER_NAME}") {
          withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
            sh '''
              npx --yes sonar-scanner \
                -Dsonar.projectKey=simple-express-app \
                -Dsonar.projectName="simple-express-app" \
                -Dsonar.sources=. \
                -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
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

  post {
    always {
      archiveArtifacts artifacts: 'coverage/**, **/npm-debug.log', allowEmptyArchive: true
    }
  }
}
