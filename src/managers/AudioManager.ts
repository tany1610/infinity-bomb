export interface AudioManagerConfig {
    musicConfig: Phaser.Types.Sound.SoundConfig;
    soundConfig: Phaser.Types.Sound.SoundConfig;
}

export class AudioManager {
    private static instance: AudioManager | null = null;

    private scene!: Phaser.Scene;
    private sounds: Map<string, Phaser.Sound.BaseSound> = new Map();
    private music: Phaser.Sound.BaseSound | null = null;

    private musicConfig: Phaser.Types.Sound.SoundConfig;
    private soundConfig: Phaser.Types.Sound.SoundConfig;

    private constructor({ musicConfig, soundConfig }: AudioManagerConfig) {
        this.musicConfig = musicConfig;
        this.soundConfig = soundConfig;
    }

    public static init(scene: Phaser.Scene, config: AudioManagerConfig): void {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager(config);
        }
        AudioManager.instance.scene = scene;
    }

    public static getInstance(): AudioManager {
        if (!AudioManager.instance) {
            throw new Error(
                "AudioManager not initialized! Call AudioManager.init(scene, config) first."
            );
        }
        return AudioManager.instance;
    }

    public static preload(scene: Phaser.Scene, audioFiles: Record<string, string>): void {
        Object.entries(audioFiles).forEach(([key, path]) => {
            scene.load.audio(key, path);
        });
    }

    public add(key: string): void {
        if (!this.sounds.has(key)) {
            const sound = this.scene.sound.add(key, {
                ...this.soundConfig,
            });
            this.sounds.set(key, sound);
        }
    }

    public playMusic(key: string): void {
        if (this.music) {
            this.music.stop();
        }

        const sound = this.scene.sound.add(key, {
            ...this.musicConfig,
        });

        this.music = sound;
        this.music.play();
    }

    public stopMusic(): void {
        if (this.music) {
            this.music.stop();
            this.music = null;
        }
    }

    public playSfx(key: string): void {
        let sound = this.sounds.get(key);

        if (!sound) {
            sound = this.scene.sound.add(key, { ...this.soundConfig });
            this.sounds.set(key, sound);
        }

        sound.play({ ...this.soundConfig });
    }

    public muteAll(muted: boolean): void {
        this.scene.sound.mute = muted;
    }

    public destroy(): void {
        this.sounds.forEach((sound) => sound.destroy());
        if (this.music) {
            this.music.destroy();
        }
        this.sounds.clear();
        this.music = null;
    }
}
