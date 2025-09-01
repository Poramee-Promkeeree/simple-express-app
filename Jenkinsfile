pipeline {
  agent any

  tools {
    nodejs 'Nodejs'   // ต้องตรงกับชื่อที่ตั้งใน Jenkins (ดูจากภาพของคุณ)
  }

  environment {
    SONARQUBE_SERVER = 'sonarqube'   // ชื่อ SonarQube server ที่คุณตั้งไว้
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
        sh '''
          echo "Node version:" && node -v
          echo "NPM version:" && npm -v
          if [ -f package-lock.json ]; then
            npm ci
          else
            npm install
          fi
        '''
      }
    }

    stage('SonarQube Scan') {
      steps {
        script {
          def scannerHome = tool name: 'SonarQube Scanner',
                                 type: 'hudson.plugins.sonar.SonarRunnerInstallation'

          withSonarQubeEnv("${SONARQUBE_SERVER}") {
            sh """
              "${scannerHome}/bin/sonar-scanner" \
                -Dsonar.projectKey=SampleJenkinsApp \
                -Dsonar.projectName=SampleJenkinsApp \
                -Dsonar.sources=. \
                -Dsonar.branch.name=main
            """
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
