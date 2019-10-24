import express, { Application } from 'express'
import morgan from 'morgan'
import passport from 'passport'

// Routes
import UserRoutes from './routes/user.routes'

export class App {
    app: Application;

    constructor(
        private port?: number | string
    ) {
        this.app = express();
       this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
            next();
        });
        this.settings();
        this.middlewares();
        this.routes();
    }

    private settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    private middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    private routes() {
        this.app.use('/api/v1/users', UserRoutes);
    }

    async listen(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

}