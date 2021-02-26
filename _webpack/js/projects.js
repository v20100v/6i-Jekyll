import Masonry from 'masonry-layout';

import '../scss/layouts/projects.scss';
import * as Dom from "./utils/Dom";

Dom.ready(() => {

    // Persist in high scope all masonries (one masonry by year)
    let masonries = [];

    /**
     * Iterate all grid with masonry, and push item in array
     */
    const _initMasonry = () => {
        let grids = document.querySelectorAll('.grid');

        [...grids].forEach((grid) => {
            let masonry = new Masonry(grid, {
                percentPosition: true,
                horizontalOrder: true
            });
            masonries.push(masonry);
        });

        _handleHeightCardTitle();
        _layoutAllMasonries();
    };

    /**
     * Call layout in all masonries. It's useful when an item has changed size, and need to be laid out again.
     */
    const _layoutAllMasonries = () => {
        [...masonries].forEach((masonry) => {
            masonry.layout();
        });
    };

    /**
     * Change the height of each card title with their maximum height
     */
    const _handleHeightCardTitle = () => {
        let blocksYear = document.querySelectorAll('.blocks-year');

        [...blocksYear].forEach((blockYear) => {
            let maxHeight = 0;
            let cardsTitle = blockYear.querySelectorAll('.card-title');

            [...cardsTitle].forEach((cardTitle) => {
                let h5Height = cardTitle.querySelector('h5').offsetHeight;
                if (maxHeight < h5Height) {
                    maxHeight = h5Height;
                }
            });

            [...cardsTitle].forEach((cardTitle) => {
                cardTitle.style.height = maxHeight + 'px';
            });
        });
    };

    /**
     * Refresh view on resize window
     */
    const _handleResizeWindow = () => {
        Dom.handleResizeWindow(()=> {
            _handleHeightCardTitle();
            _layoutAllMasonries();
        });
    };

    /**
     * Handle click on a card body, in order to show more information and change position in current grid.
     */
    const _handleClickCardBody = () => {
        let blocksYear = document.querySelectorAll('.blocks-year');
        let blocIndex = 0;

        [...blocksYear].forEach((blockYear) => {
            let cards = blockYear.querySelectorAll('.card');
            let currentMasonry = masonries[blocIndex];

            [...cards].forEach((card) => {
                let col = card.parentElement;
                let cardBody = card.querySelector('.card-body');
                let cardFooter = card.querySelector('.card-footer');
                let cardMoreInformation = cardBody.querySelector('.card-more-informations');

                let handleClick = (event) => {
                    event.stopPropagation();
                    if (event.target.classList.contains('btn-show-more')) {
                        return;
                    }

                    // document.querySelector('.project-technologies').classList.remove('d-none');

                    cardMoreInformation.classList.toggle('is-visible');
                    col.classList.toggle('col-lg-4');
                    col.classList.toggle('col-sm-6');
                    col.classList.toggle('col-12');

                    currentMasonry.layout();
                    currentMasonry.once('layoutComplete', function () {
                        card.scrollIntoView({
                            block: 'center',
                            behavior: 'smooth',
                            inline: 'nearest'
                        });
                    });
                }

                cardBody.addEventListener('click', handleClick);
                cardFooter.addEventListener('click', handleClick);
            });

            blocIndex++;
        });

        _handleHeightCardTitle();
        _layoutAllMasonries();
    };

    const _showAsGrid = (btn, svg) => {
        document.querySelector('.projects-as-list').classList.add('d-none');
        document.querySelector('.projects-as-grid').classList.remove('d-none');
        btn.title = "Show as list";
        svg.classList.add('fa-list');
        svg.classList.remove('fa-th');
        _handleHeightCardTitle();
        _layoutAllMasonries();
    };

    const _showAsList = (btn, svg) => {
        document.querySelector('.projects-as-list').classList.remove('d-none');
        document.querySelector('.projects-as-grid').classList.add('d-none');
        btn.title = "Show as Grid";
        svg.classList.remove('fa-list');
        svg.classList.add('fa-th');
    }

    /**
     * Toogle view projects as a list or grid
     */
    const _handleClickProjectsAsListOrGrid = () => {
        let btn = document.querySelector('#btn-show-as-list-or-grid');

        btn.addEventListener('click', () => {
            let svg = btn.querySelectorAll('svg[data-fa-i2svg]')[0];
            if (svg.classList.contains('fa-list')) {
                _showAsList(btn, svg);
                window.localStorage.setItem('userPreferences.showAs', 'list');
            } else {
                _showAsGrid(btn, svg);
                window.localStorage.setItem('userPreferences.showAs', 'grid');
            }
        });
    };

    const _showBlocsTechnologies = () => {
        let nodes = document.querySelectorAll('.project-technologies');
        let btn = document.querySelector('#btn-show-technologies');
        [...nodes].forEach((node) => {
            node.classList.remove('d-none');
        });
        let blocFilterTechnologies = document.querySelector('.filter-technologies');
        blocFilterTechnologies.classList.remove('d-none');
        btn.title = "Hide technologies";
    };

    const _hideBlocsTechnologies = () => {
        let nodes = document.querySelectorAll('.project-technologies');
        let btn = document.querySelector('#btn-show-technologies');
        [...nodes].forEach((node) => {
            node.classList.add('d-none');
        });
        let blocFilterTechnologies = document.querySelector('.filter-technologies');
        blocFilterTechnologies.classList.add('d-none');
        btn.title = "Show technologies";
    };

    /**
     * Handle click to show technologies (in filter buttons and project list)
     */
    const _handleClickShowTechnologies = () => {
        let btn = document.querySelector('#btn-show-technologies');
        let blocFilterTechnologies = document.querySelector('.filter-technologies');

        btn.addEventListener('click', () => {
            if (blocFilterTechnologies.classList.contains('d-none')) {
                _showBlocsTechnologies();
                window.localStorage.setItem("userPreferences.showTechnologies", true);
            } else {
                _hideBlocsTechnologies()
                window.localStorage.setItem("userPreferences.showTechnologies", false);
            }

            // Refresh layout of all masonries
            _handleHeightCardTitle();
            _layoutAllMasonries();
        });
    };

    /**
     * Handle filters by type of project and related technologies
     */
    const _handleFilters = () => {

        /**
         * Parse and return all projects in DOM (for grid and list views)
         */
        function _getProjects() {
            let projects = [];
            let nodes = document.querySelectorAll('.project');
            for (let node of nodes) {
                let project = {};
                project.title = node.getAttribute('data-project-title');
                project.type = node.getAttribute('data-project-type');
                project.technologies = node.getAttribute('data-project-technologies').split('|');
                project.node = node;
                project.isVisible = true;
                projects.push(project);
            }
            return projects;
        }

        /**
         * Toggle display of block year. If all project in a block year are hidden, so we hide also the block year.
         */
        function _toggleBlocksYear() {
            let blocksYear = document.querySelectorAll('.blocks-year');
            for (let blockYear of blocksYear) {
                let projects = blockYear.querySelectorAll('.project');
                let allHidden = true;
                for (let project of projects) {
                    if (!project.classList.contains('d-none')) {
                        allHidden = false;
                        break;
                    }
                }
                if (allHidden) {
                    blockYear.classList.add('d-none');
                } else {
                    blockYear.classList.remove('d-none');
                }
            }
        }

        /**
         * Toggle display of buttons technologies. Enable/disabled depend on type project chosen.
         */
        function _toggleButtonsTechnologies() {
            let btnsFilterTechnology = document.querySelectorAll('.btn-filterByTechnology');

            if (filters.filterByType.length === 0) {
                // Enabled all buttons if no filter by type
                for (let btn of btnsFilterTechnology) {
                    btn.classList.remove('disabled');
                }
            } else {
                // Fetch technologies to shown
                let technologiesToShown = [];
                for (let project of projects) {
                    if (!project.node.classList.contains('d-none')) {
                        technologiesToShown = technologiesToShown.concat(project.technologies);
                    }
                }
                technologiesToShown = [...new Set(technologiesToShown.sort())];
                for (let btn of btnsFilterTechnology) {
                    if (technologiesToShown.includes(btn.getAttribute('data-filter-value'))) {
                        btn.classList.remove('disabled');
                    } else {
                        btn.classList.add('disabled');
                    }
                }
            }
        }

        /**
         * Custom filter by type of project
         */
        function _filterByType(project) {
            for (let currentFilter of filters.filterByType) {
                if (project.type === currentFilter) {
                    return true;
                }
            }
        }

        /**
         * Custom filter by technologies of project
         */
        function _filterByTechnologies(project) {
            for (let currentFilter of filters.filterByTechnology) {
                if (project.technologies.includes(currentFilter)) {
                    return true;
                }
            }
        }


        function _applyMultipleFilters() {
            // No filters, show all projects
            if (filters.filterByType.length === 0 && filters.filterByTechnology.length === 0) {
                for (let project of projects) {
                    project.node.classList.remove('d-none');
                }
            } else {
                let filteredProjects = projects;
                if (filters.filterByType.length > 0) {
                    filteredProjects = filteredProjects.filter(_filterByType);
                }
                if (filters.filterByTechnology.length > 0) {
                    filteredProjects = filteredProjects.filter(_filterByTechnologies);
                }

                for (let project of projects) {
                    project.node.classList.add('d-none');
                }
                for (let filteredProject of filteredProjects) {
                    filteredProject.node.classList.remove('d-none');
                }
            }
        }

        /**
         * Toggle item in an given array
         */
        function _toogleItemInArray(array, item) {
            let index = array.indexOf(item);
            if (index === -1) {
                array.push(item);
            } else {
                do {
                    array.splice(index, 1);
                    index = array.indexOf(item);
                } while (index !== -1);
            }
        }

        /**
         * Handle click on buttons filter
         */
        function _handleClickFilterButton(filterName) {
            filters[filterName] = [];

            let buttons = document.querySelectorAll('.btn-' + filterName);
            for (let button of buttons) {
                button.addEventListener('click', () => {
                    button.classList.toggle('active');
                    let filterValue = button.getAttribute('data-filter-value')
                    _toogleItemInArray(filters[filterName], filterValue);
                    _applyMultipleFilters();
                    // To enable or disabled buttons filter technologies
                    _toggleButtonsTechnologies();
                    // Toggle display of block year. If all project in a block year are hidden, so we hide also the block year.
                    _toggleBlocksYear();
                    // Refresh layout of all masonries
                    _handleHeightCardTitle();
                    _layoutAllMasonries();
                });
            }
        }

        let filters = {};
        let projects = _getProjects();
        _handleClickFilterButton('filterByType');
        _handleClickFilterButton('filterByTechnology');
    };

    /**
     * Load user preferences in projects view page (show technologies, show as list or grid)
     */
    const _loadUserPreferences = () => {
        Dom.fontawesomeReady(() => {
            if (window.localStorage) {
                let userPreferences = {};
                userPreferences.showTechnologies = window.localStorage.getItem('userPreferences.showTechnologies');
                userPreferences.showAs = window.localStorage.getItem('userPreferences.showAs');

                // Show or hide blocs technologies
                if (userPreferences.showTechnologies === 'true') {
                    _showBlocsTechnologies();
                } else {
                    _hideBlocsTechnologies();
                }

                // Show project as a list or as grid
                let btn = document.querySelector('#btn-show-as-list-or-grid');
                let svg = btn.querySelectorAll('svg[data-fa-i2svg]')[0];
                if (userPreferences.showAs === 'list') {
                    _showAsList(btn, svg);
                } else {
                    _showAsGrid(btn, svg);
                }
            } else {
                console.warn('[6i-Jekyll-Theme] Local Storage not Supported, please stop MINITEL !');
            }
        });
    };

    /**
     * In tartiflette we trust !
     */
    (function initView() {
        _loadUserPreferences();
        _initMasonry();
        _handleHeightCardTitle();
        _handleResizeWindow();
        _handleClickCardBody();
        _handleClickProjectsAsListOrGrid();
        _handleClickShowTechnologies();
        _handleFilters();
    })();
});