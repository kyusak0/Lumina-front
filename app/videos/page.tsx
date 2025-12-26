'use client'

import MainLayout from "../layouts/mainLayout";
import Link from "next/link";
import Popup from "../components/popup/Popup";
import ContextMenu from "../components/contextMenu/ContextMenu";

export interface VideoPromps {
    id: number,
}

export default function Videos() {
    const videos: VideoPromps[] = [{
        id: 0,
    }, {
        id: 1,
    }]
    return (
        <MainLayout>
            <h1>Videos Catalog</h1>
            <div >{videos.map((video: VideoPromps) => (
                <div key={video.id}>
                    <Link href={`videos/${video.id}`}>
                        {video.id}
                    </Link>
                </div>
            ))}</div>

            <ul>
                <li>
                    <Popup popupId='popup1' openPopupText='1'>
                        1
                    </Popup>
                </li>
<li>
<ContextMenu contextMenuId="1" openContextMenuText="2" secondaryActivatorId='3'>
    2
</ContextMenu>
                </li>

                <li id="3">3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>10</li>
                <li>11</li>
                <li>12</li>
                <li>13</li>
                <li>14</li>
                <li>15</li>
                <li>16</li>
                <li>17</li>
                <li>18</li>
                <li>19</li>
                <li>20</li>
                <li>21</li>
                <li>22</li>
                <li>23</li>
                <li>24</li>
                <li>25</li>
                <li>26</li>
                <li>27</li>
                <li>28</li>
                <li>29</li>
                <li>30</li>
                <li>31</li>
                <li>32</li>
                <li>33</li>
                <li>34</li>
                <li>35</li>
                <li>36</li>
                <li>37</li>
                <li>38</li>
                <li>39</li>
                <li>40</li>
            </ul>

            {/* это каталог с видосами, по нажатию на любое видео открывается страница с ним[slug], */}

        </MainLayout>

    )
}