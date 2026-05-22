(function () {
    var React = window.React;
    var ReactDOM = window.ReactDOM;
    var html = window.htm.bind(React.createElement);

    var heroNotes = [
        "Friendship, life, and everything in between",
        "Easy listening for commutes, walks, and late-night catchups",
        "New episodes, clips, and behind-the-scenes updates on Instagram"
    ];

    var sections = [
        {
            id: "intro",
            kicker: "Welcome in",
            title: "Feels like sitting in on the group chat.",
            description: "A quick sense of the show's tone and rhythm.",
            renderContent: function () {
                return html`
                    <div className="intro-grid">
                        <div>
                            <p>
                                Between Friends blends heart, humor, and personality. It is casual enough to feel
                                welcoming and thoughtful enough to keep people listening once they press play.
                            </p>
                        </div>
                    </div>
                `;
            }
        },
        {
            id: "listen",
            kicker: "Start listening",
            title: "Choose a place to start listening.",
            description: "Open your preferred player and jump right in.",
            renderContent: function () {
                return html`
                    <div className="platform-grid">
                        <article className="platform-card">
                            <div className="platform-copy">
                                <p className="platform-label">Apple Podcasts</p>
                                <h3>Follow along on Apple Podcasts.</h3>
                                <p>Listen in the Apple Podcasts app and stay current as new episodes drop.</p>
                            </div>
                            <iframe
                                className="platform-embed embed-apple"
                                title="Between Friends Podcast on Apple Podcasts"
                                allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                                frameBorder="0"
                                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                                src="https://embed.podcasts.apple.com/us/podcast/between-friends-podcast/id1734120490"
                            ></iframe>
                        </article>
                        <article className="platform-card">
                            <div className="platform-copy">
                                <p className="platform-label">Spotify</p>
                                <h3>Queue it up on Spotify.</h3>
                                <p>Perfect for a quick sample, a long drive, or adding a new show to your rotation.</p>
                            </div>
                            <iframe
                                className="platform-embed embed-spotify"
                                title="Between Friends Podcast on Spotify"
                                src="https://open.spotify.com/embed/show/2XxaYcqSgKaXIaerXjQ0Fs?utm_source=generator"
                                width="100%"
                                frameBorder="0"
                                allowFullScreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                        </article>
                    </div>
                `;
            }
        },
        {
            id: "social",
            kicker: "Stay in the loop",
            title: "Keep up with the show between episodes.",
            description: "For highlights and behind-the-scenes updates, follow along on Instagram.",
            renderContent: function () {
                return html`
                    <div className="social-card">
                        <div className="social-copy">
                            <p className="platform-label">Instagram</p>
                            <h3>@between.friends.podcast</h3>
                            <p>Catch new posts, profile updates, and the social side of the podcast.</p>
                            <a className="button button-secondary" href="https://www.instagram.com/between.friends.podcast/" target="_blank" rel="noreferrer">
                                Open Instagram
                            </a>
                        </div>
                        <blockquote
                            className="instagram-media"
                            data-instgrm-permalink="https://www.instagram.com/between.friends.podcast/?utm_source=ig_embed&amp;utm_campaign=loading"
                            data-instgrm-version="14"
                        >
                            <div>
                                <a
                                    href="https://www.instagram.com/between.friends.podcast/?utm_source=ig_embed&amp;utm_campaign=loading"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View this profile on Instagram
                                </a>
                            </div>
                        </blockquote>
                    </div>
                `;
            }
        }
    ];

    function useCommitInfo() {
        return React.useMemo(function () {
            var shortTag = document.querySelector('meta[name="build-commit-short"]');
            var fullTag = document.querySelector('meta[name="build-commit"]');
            var shortSha = shortTag ? shortTag.content : "";
            var fullSha = fullTag ? fullTag.content : "";
            return {
                shortSha: shortSha.indexOf("__BUILD") === 0 ? "local" : shortSha,
                fullSha: fullSha.indexOf("__BUILD") === 0 ? "local-preview" : fullSha
            };
        }, []);
    }

    function AccordionSection(props) {
        var section = props.section;
        var isOpen = props.isOpen;
        var toggle = props.toggle;
        var contentId = section.id + "-panel";
        var headerId = section.id + "-header";

        React.useEffect(function () {
            if (section.id === "social" && isOpen && window.instgrm && window.instgrm.Embeds) {
                window.instgrm.Embeds.process();
            }
        }, [isOpen, section.id]);

        return html`
            <section className=${"section-shell " + (isOpen ? "section-open" : "")}>
                <button
                    id=${headerId}
                    className="section-toggle"
                    type="button"
                    aria-expanded=${isOpen}
                    aria-controls=${contentId}
                    onClick=${function () { toggle(section.id); }}
                >
                    <div className="section-toggle-copy">
                        <p className="section-kicker">${section.kicker}</p>
                        ${isOpen && html`
                            <h2>${section.title}</h2>
                            <p className="section-summary">${section.description}</p>
                        `}
                    </div>
                    <span className="section-indicator" aria-hidden="true"></span>
                </button>
                <div
                    id=${contentId}
                    className=${"section-panel " + (isOpen ? "section-panel-open" : "")}
                    role="region"
                    aria-labelledby=${headerId}
                    hidden=${!isOpen}
                >
                    <div className="section-panel-inner">
                        ${section.renderContent()}
                    </div>
                </div>
            </section>
        `;
    }

    function App() {
        var initialOpen = [];
        var state = React.useState(initialOpen);
        var openSections = state[0];
        var setOpenSections = state[1];
        var commitInfo = useCommitInfo();

        var toggleSection = React.useCallback(function (sectionId) {
            setOpenSections(function (current) {
                return current.indexOf(sectionId) >= 0
                    ? current.filter(function (id) { return id !== sectionId; })
                    : current.concat(sectionId);
            });
        }, []);

        return html`
            <main className="page-shell">
                <section className="hero section-shell hero-shell">
                    <div className="hero-copy">
                        <p className="eyebrow">The Between Friends Podcast</p>
                        <h1>Honest, funny conversations that feel close to home.</h1>
                        <p className="hero-text">
                            Join Chloe, Kennedy, Madison, and Sydney for stories, reflections, and the kind
                            of catch-up that makes everyday life feel worth replaying.
                        </p>
                        <div className="hero-actions">
                            <a className="button button-primary" href="https://open.spotify.com/show/2XxaYcqSgKaXIaerXjQ0Fs" target="_blank" rel="noreferrer">
                                Play on Spotify
                            </a>
                            <a className="button button-secondary" href="https://podcasts.apple.com/us/podcast/between-friends-podcast/id1734120490" target="_blank" rel="noreferrer">
                                Open in Apple Podcasts
                            </a>
                        </div>
                    </div>
                    <div className="hero-art">
                        <div className="hero-rail">
                            <div className="title-frame">
                                <img src="title.png" alt="Between Friends Podcast title art" />
                            </div>
                            <aside className="hero-sidecar" aria-label="Podcast highlights">
                                <p className="platform-label">Why listen</p>
                                <ul className="hero-notes">
                                    ${heroNotes.map(function (note) {
                                        return html`<li key=${note}>${note}</li>`;
                                    })}
                                </ul>
                            </aside>
                        </div>
                    </div>
                </section>

                <div className="section-stack">
                    ${sections.map(function (section) {
                        return html`
                            <${AccordionSection}
                                key=${section.id}
                                section=${section}
                                isOpen=${openSections.indexOf(section.id) >= 0}
                                toggle=${toggleSection}
                            />
                        `;
                    })}
                </div>

                <footer className="site-footer">
                    <p>Between Friends Podcast</p>
                    <div className="footer-links">
                        <a href="https://open.spotify.com/show/2XxaYcqSgKaXIaerXjQ0Fs" target="_blank" rel="noreferrer">Spotify</a>
                        <a href="https://podcasts.apple.com/us/podcast/between-friends-podcast/id1734120490" target="_blank" rel="noreferrer">Apple Podcasts</a>
                        <a href="https://www.instagram.com/between.friends.podcast/" target="_blank" rel="noreferrer">Instagram</a>
                    </div>
                    <p className="commit-pill" title=${commitInfo.fullSha}>Live build: ${commitInfo.shortSha}</p>
                </footer>
            </main>
        `;
    }

    ReactDOM.createRoot(document.getElementById("root")).render(html`<${App} />`);
}());
