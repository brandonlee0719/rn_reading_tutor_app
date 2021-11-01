
import { NavigationProp } from '@react-navigation/native';
import layout from './layout';
import { SoundMatchPresenter, SoundMatchView } from './presenter';
import { BaseScreen } from '../base/screen';
import { getItem, API_TOKEN } from '../../../utils/prefUtils';
import { NetworkInterface, AxiosAdapter } from '../../../data/cloud/network/network';
import apiConstants from '../../../constants/apiConstants';
import AlertResult from "../../components/alert-result";
import Sound from 'react-native-sound'
import ReactNativeBlobUtil from 'react-native-blob-util';

export interface Props {
    navigation: NavigationProp<any, any>
};

export class SoundMatchScreen extends BaseScreen implements SoundMatchView {

    private presenter = new SoundMatchPresenter(this)
    state = {
        selectedIndex: [],
        clickedIndex: [false, false, false],
        exerciseList: [],
        exerciseTime: '',
        currentIndex: 0,
        currentQuestion: {},
        currentAnswer: {},
        currentOptions: [],
        currentProgress: undefined,
        currentTime: undefined,
        totalTimeTaken: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        learnerId: '',
        lessonId: '',
        dialogVisible: false,
        loaderVisible : false,
        isWrongPressed : false,
        playingQuestion: false,
        playingAnswer1: false,
        playingAnswer2: false,
        playingAnswer3: false,
        isAutomaticPlaying: false,
        canPlayAutomatically: true
    }

    audioPlayer?: Sound
    audios: (string | undefined)[] = Array(100);
    audioStates: (('loaded' | 'failed' | 'loading') | undefined)[] = Array(100);

    questionInterval = 0;
    questionTimeout = 0;

    componentDidMount = async () => {
        await this.getdata()
        this.updatePage()
    }

    componentWillUnmount() {
        this.audioPlayer?.stop()
        this.audioPlayer?.release()
        clearInterval(this.questionInterval)
        clearTimeout(this.questionTimeout)
    }

    getdata = async () => {
        let exerciseList = this.props.route.params.exercise  
        console.log(exerciseList);
              
        if (exerciseList) {
            exerciseList = exerciseList.map((item: any) => {
                item.choices = this.shuffleArray(item.choices)
                return item;
            })
        }
        console.log('-------');
        
        console.log(exerciseList);
        
        this.setState({ exerciseList })
        console.log("found exercise in sound match", this.state.exerciseList[0])

        this.setState({ exerciseTime: this.props.route.params.duration })
        console.log("found duration in sound match", this.state.exerciseTime)

        this.setState({ learnerId: this.props.route.params.learner })
        console.log("found learner in sound match", this.state.learnerId)

        this.setState({ lessonId: this.props.route.params.lesson })
        console.log("found lesson in sound match", this.state.lessonId)
    }

    async loadSounds(next: boolean) {
        const currentIndex = this.state.currentIndex;   
        let exercises = this.state.exerciseList.map((item, index) => {
            item.index = index;
            return item;
        });                
        let urls: {index: number, url: string}[] = [];
        exercises.forEach((exercise) => {            
            const questionUrl = exercise.question.audioLink
            urls.push({index: exercise.index * 4, url: questionUrl})
            const optionUrls = exercise.choices.map((item, index) => {
                return {index: (exercise.index * 4) + index + 1, url: item.audioLink }
            })
            urls.push(...optionUrls)
        })
        const lowerLimit = currentIndex * 4;
        const upperLimit = (currentIndex + (next ? 3 : (currentIndex === 0 ? 2 : 1))) * 4;
        urls = urls.slice(lowerLimit, upperLimit);
        let audioStates = this.audioStates.slice(lowerLimit, upperLimit)
        urls = urls.filter((_, index) => audioStates[index] === undefined || audioStates[index] === 'failed')

        if (urls.length === 0) return

        for (const item of urls) {
            this.audioStates[item.index] = 'loading';
            let path = await this.downloadAudio(item.url);
            this.audioStates[item.index] = path === undefined ? 'failed' : 'loaded'
            //let audio = new Sound(path)
            this.audios[item.index] = path
            this.checkPageState()
        }
    }

    async downloadAudio(url: string): Promise<string | undefined> {
        const paths = url.split('/');
        const fileName = paths[paths.length -1 ];
        const dirs = ReactNativeBlobUtil.fs.dirs;
        const finalPath = dirs.CacheDir + '/com.blobutil/' + fileName
        
        /*
        let sessionPaths = ReactNativeBlobUtil.session('sounds').list();
        console.log(sessionPaths);
        ReactNativeBlobUtil.session('sounds').dispose().then(() => {
            ReactNativeBlobUtil.session('sounds')
            console.log(ReactNativeBlobUtil.session('sounds').list())
        })
        return undefined;*/

        
        let cachedFiles = ReactNativeBlobUtil.session('sounds').list();
        if (cachedFiles.includes(finalPath)) {
            return finalPath;
        }

        try {
            let response = await ReactNativeBlobUtil
            .config({
                path: finalPath,
                session: 'sounds',
                overwrite: true,
                appendExt: 'mp3',
                IOSBackgroundTask: true
            })
            .fetch('GET', url, {})
            let status = response.info().status;
            if(status === 200) {
                let path = response.path();
                if (path) {
                    const sessionList = ReactNativeBlobUtil.session('sounds').list();
                    if (!sessionList.includes(path)) {
                        response.session('sounds')
                    }
                    return path;
                }
            }
            return undefined;
        } catch {
            return undefined;
        }
    }

    checkPageState() {
        const currentIndex = this.state.currentIndex
        const lowerLimit = currentIndex * 4;
        const upperLimit = (currentIndex + (currentIndex === 0 ? 2 : 1)) * 4;
        const audiosForCurrentIndex = this.audioStates.slice(lowerLimit, upperLimit);   
        /*
        console.log(this.audioStates);
        console.log('----------------');*/
        
        const loaderVisible = audiosForCurrentIndex.includes('loading') || audiosForCurrentIndex.includes(undefined)
        this.setState({loaderVisible} , () => {
            this.showQuestionAndOptionsIfPossible()
        })
    }

    shuffleArray(array) {
        let i = array.length - 1;
        for (; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    updatePage() {
        const index = this.state.currentIndex
        console.log("current index ==> ", index)
        console.log("total question lengt ==> ", this.state.exerciseList.length)
        if (index <= this.state.exerciseList.length - 1) {
            console.log("question in exercise ==>", this.state.exerciseList[index].question)
            this.setState({ isWrongPressed: false })
            this.setState({ currentQuestion: this.state.exerciseList[index].question }, () => {
                // SoundPlayerQuestion.loadUrl(this.state.currentQuestion.audioLink)
                // this.playQuestion()
            })
            const options = this.state.exerciseList[index].choices
            console.log("options in exercise ==>", options[0])
            console.log("options in exercise ==>", options[1])
            console.log("options in exercise ==>", options[2])
            this.setState({ currentOptions: options })
            let arrSelect = []
            options.map((opt) => {
                console.log("option data : ", opt.text)
                console.log("option data correct answer: ", this.state.exerciseList[index].answer)
                arrSelect.push(opt.text == this.state.exerciseList[index].answer.text ? true : false)
            });
            this.setState({ selectedIndex: arrSelect }, () => {
                console.log("selected index", this.state.selectedIndex)
            })
            console.log("answer in exercise ==>", this.state.exerciseList[index].answer)
            this.setState({ currentAnswer: this.state.exerciseList[index].answer })

            this.checkPageState()
            this.loadSounds(false)        
        }
        else {
            console.log("All questions completed")
            console.log("Total time taken", this.state.totalTimeTaken)
            console.log("correct answers", this.state.correctAnswers)
            console.log("wrong answers", this.state.wrongAnswers)
            this.openResult()

        }
    }

    showQuestionAndOptionsIfPossible() {
        setTimeout(() => {
            if (!this.state.loaderVisible && this.state.canPlayAutomatically) {
                this.setState({ canPlayAutomatically: false, isAutomaticPlaying: true }, () => {
                    console.log("Loading close")
                    this.playQuestion(() => {
                        this.playAnswer(0, 2000, () => {
                            this.playAnswer(1, 2000, () => {
                                this.playAnswer(2, 2000, () => {
                                    this.setState({ isAutomaticPlaying: false})
                                    this.loadSounds(true)
                                    this.startTimer()
                                })
                            })
                        })
                    })
                }) 
            }  
        }, 1000);
    }

    async apiSendLessonData() {
        console.log("in api send lesson data")
        const token = await getItem(API_TOKEN)
        var network: NetworkInterface = new AxiosAdapter()
        let endPoint = apiConstants.API_URL + apiConstants.getLesson + "/" + this.state.lessonId + apiConstants.getLessonLearnerId + this.state.learnerId
        console.log("send lesson data url", endPoint)
        // let params = { 'email': this.state.email, 'password': this.state.password }
        // {
        //     "durationMSec": 120,
        //     "paceMSec": 120,
        //     "correctAnswers": 10,
        //     "wrongAnswers": 5
        //   }
        let params = {
            'durationMSec': this.state.exerciseTime,
            'paceMSec': this.state.totalTimeTaken,
            'correctAnswers': this.state.correctAnswers,
            'wrongAnswers': this.state.wrongAnswers,
        }
        try {
            console.log("API Token ==>", token)
            console.log("send lesson params ==>", params)
            let response = await network.post(endPoint, params, token)
            console.log("send lesson response ==>", response)
            // this.showSuccessAlert("Lesson data submitted successfully")
            this.showCompletedLessons()

        } catch (error) {
            console.log("send lesson Error ==>", error)
            // throw RepoError.fromJson(error.response.data) ?? RepoError.unknown
        }

    }

    startTimer = () => {
        this.setState({ currentProgress: 0, currentTime: 0 })
        this.questionInterval = setInterval(() => {
            // console.log("In Update time : ", this.state.currentIndex)
            var time = this.state.currentTime + 1000
            // console.log("time : ", time)
            var progress = (Number(time) * 100) / Number(this.state.exerciseTime)
            // console.log("progress : ", progress)
            this.setState({ currentProgress: progress })
            this.setState({ currentTime: time })
        }, 1000);

        this.questionTimeout = setTimeout(() => {
            clearInterval(this.questionInterval)
            this.questionInterval = 0
            clearTimeout(this.questionTimeout)
            this.setState({
                currentIndex: this.state.currentIndex + 1,
                totalTimeTaken: this.state.totalTimeTaken + this.state.currentTime,
                currentTime: undefined,
                wrongAnswers: this.state.wrongAnswers + 1,
                currentProgress: undefined,
                selectedIndex: [],
                clickedIndex: [false, false, false],
                canPlayAutomatically: true,
            }, () => {                
                this.updatePage()
            })
        }, Number(this.state.exerciseTime) + 1000);
    }

    showNextLessons() {
        this.props.navigation.navigate('SoundMatchTextScreen')
        // this.setState({dialogVisible : true})

    }

    openResult() {
        // pass progress out of 100
        console.log("open result alert")
        var fishCount = 0
        if (this.state.correctAnswers == this.state.exerciseList.length) {
            fishCount = 3
        }
        else if (this.state.correctAnswers >= 13) {
            fishCount = 1
        }

        // if (fishCount == 0) {
        //     AlertResultFailed.show('So Close', 30, 1, "Try Again", () => {
        //         // console.log("try again clicked")
        //     })
        // }
        // else {
        AlertResult.show(fishCount == 0 ? 'So Close' : fishCount == 1 ? 'Almost Perfect!' : 'Great Job!', (this.state.correctAnswers / this.state.exerciseList.length) * 100, fishCount, fishCount == 0 ? "Try Again" : "Go", () => {
            if (fishCount == 0) {
                console.log("Try again")
                this.showCompletedLessons()
            } else {
                this.apiSendLessonData()
            }

        })
        // }

    }

    showPreviousLessons() {
        this.props.navigation.goBack()
    }
    showCompletedLessons() {
        this.props.navigation.pop(3)
    }

    setIndex(index: number) {
        console.log("set Index clicked")
        console.log(this.state.selectedIndex)

        if (this.state.clickedIndex.includes(index)) {

        }
        else {
            var arr = this.state.clickedIndex
            arr[index] = true
            console.log("after append : ", arr)
            this.setState({ clickedIndex: arr })
        }
        
        var chooseOption = this.state.currentOptions[index]
        var answer = this.state.currentAnswer

        console.log(chooseOption);
        console.log(answer);
        
        
        if (chooseOption.text == answer.text) {
            //correct answer
            console.log("correct answer")
            // var arr = this.state.selectedIndex
            // arr.push(index)
            // console.log("after append : ", arr)
            // this.setState({ selectedIndex: arr })

            setTimeout(
                function () {
                    clearInterval(this.questionInterval)
                    this.questionInterval = 0
                    clearTimeout(this.questionTimeout)
                    this.setState({
                        currentIndex: this.state.currentIndex + 1,
                        totalTimeTaken: this.state.totalTimeTaken + this.state.currentTime,
                        currentTime: undefined,
                        correctAnswers: this.state.isWrongPressed == false ? this.state.correctAnswers + 1 : this.state.correctAnswers + 0,
                        wrongAnswers: this.state.isWrongPressed == true ?  this.state.wrongAnswers + 1 : this.state.wrongAnswers + 0,
                        currentProgress: undefined,
                        selectedIndex: [],
                        clickedIndex: [false, false, false],
                        canPlayAutomatically: true,
                    }, () => {

                        this.updatePage()
                    })
                }
                    .bind(this),
                500
            );

        }
        else {
            console.log("wrong answer")
            this.setState({ isWrongPressed: true })
            // setTimeout(
            //     function () {
            //         clearInterval(this.questionInterval)
            //         this.questionInterval = 0
            //         clearTimeout(this.questionTimeout)
            //         this.setState({
            //             currentIndex: this.state.currentIndex + 1,
            //             totalTimeTaken: this.state.totalTimeTaken + this.state.currentTime,
            //             currentTime: 0,
            //             wrongAnswers: this.state.wrongAnswers + 1,
            //             currentProgress: 0,
            //             selectedIndex: [],
            //             clickedIndex: [false, false, false]
            //         }, () => {

            //             this.updatePage()
            //         })
            //     }
            //         .bind(this),
            //     500
            // );
        }
    }

    playQuestion(completion?: () => void) {
        console.log("play question")
        console.log("audio to be played ==> ", this.state.currentQuestion.audioLink)
        this.audioPlayer?.stop()
        this.audioPlayer?.release()     
        this.audioPlayer = undefined;
        try {
            this.setState({ playingQuestion: true, playingAnswer1: false, playingAnswer2: false, playingAnswer3: false })
            const currentIndex = this.state.currentIndex
            const audio = this.audios[currentIndex * 4]
            if (audio) {
                this.audioPlayer = new Sound(audio, '', (error) => {                    
                    if (error === null) {
                        this.audioPlayer?.play(() => {
                            this.setState({ playingQuestion: false })
                            this.audioPlayer?.release()
                            this.audioPlayer = undefined;
                            completion?.()
                        })
                    } else {
                        this.showErrorAlert('Something went wrong trying to play this audio')
                        this.setState({ playingQuestion: false })
                    }
                })
            } else {
                this.showErrorAlert('Something went wrong trying to play this audio')
                this.setState({ playingQuestion: false })
            }
        } catch (e) {
            console.log(`cannot play the QUESTION`, e)
            this.showErrorAlert('Something went wrong trying to play this audio')
            this.setState({ playingQuestion: false })
            if (!this.state.isAutomaticPlaying) {
                this.loadSounds(true)
            }
            completion?.()
        }
    }

    playAnswer(index: number, delayMs: number = 0, completion?: () => void) {
        console.log("play answer")
        console.log("audio to be played ==> ", this.state.currentOptions[index].audioLink)
        setTimeout(() => {
            this.audioPlayer?.stop()
            this.audioPlayer?.release()     
            this.audioPlayer = undefined;
            this.setState({ playingQuestion: false, playingAnswer1: index === 0, playingAnswer2: index === 1, playingAnswer3: index === 2 })
            try {
                const currentIndex = this.state.currentIndex
                const audio = this.audios[(currentIndex * 4) + index + 1]
                if (audio) {
                    this.audioPlayer = new Sound(audio, '', (error) => {                    
                        if (error === null) {
                            this.audioPlayer?.play(() => {
                                this.setState({ playingQuestion: false, playingAnswer1: false, playingAnswer2: false, playingAnswer3: false })
                                this.audioPlayer?.release()
                                this.audioPlayer = undefined;
                                completion?.()
                            })
                        } else {
                            this.showErrorAlert('Something went wrong trying to play this audio')
                            this.setState({ playingQuestion: false, playingAnswer1: false, playingAnswer2: false, playingAnswer3: false })
                        }
                    })
                } else {
                    this.showErrorAlert('Something went wrong trying to play this audio')
                    this.setState({ playingQuestion: false, playingAnswer1: false, playingAnswer2: false, playingAnswer3: false })
                }
            } catch (e) {
                console.log(`cannot play the sound file`, e)
                this.setState({ playingQuestion: false, playingAnswer1: false, playingAnswer2: false, playingAnswer3: false })
                completion?.()
            }

        }, delayMs);
    }

    render() {
        return layout(this)
    }
}
