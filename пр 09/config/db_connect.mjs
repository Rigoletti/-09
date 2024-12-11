import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log('Уже подключено к MongoDB');
            return;
        }

        await mongoose.connect(process.env.MongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB подключен');
    } catch (error) {
        console.error('Ошибка подключения к MongoDB:', error);
        process.exit(1); 
    }
};

export default connectDB;
